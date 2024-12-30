// app/api/chat/route.js
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';


const fetchWithRetry = async (url, options) => {

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000000);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return response;

  } catch (error) {
    clearTimeout(timeoutId);

    // if (retryCount < MAX_RETRIES - 1) {
    //   console.log(`Attempt ${retryCount + 1} failed, retrying in ${RETRY_DELAY}ms...`);
    //   await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    //   return fetchWithRetry(url, options, retryCount + 1);
    // }

    throw error;
  }
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { message, sessionId } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    try {
      const response = await fetchWithRetry(
        `${API_URL}/api/chat`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
            message,
            session_id: sessionId,
          }),
        }
      );

      const data = await response.json();
      return NextResponse.json(data);

    } catch (error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { 
            error: 'Request timed out. Please try again.',
            retryable: true 
          },
          { status: 504 }
        );
      }

      if (error.cause?.code === 'UND_ERR_CONNECT_TIMEOUT') {
        return NextResponse.json(
          { 
            error: 'Unable to connect to the backend server. Please try again later.',
            retryable: true 
          },
        );
      }

      if (error.message.includes('Failed to fetch') || error.message.includes('ECONNREFUSED')) {
        return NextResponse.json(
          { 
            error: 'Backend server is not running. Please try again later.',
            retryable: true 
          },
          { status: 503 }
        );
      }

      throw error;
    }

  } catch (error) {
    // console.error('Error in chat API:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Internal server error',
        retryable: true 
      },
      { status: 500 }
    );
  }
}