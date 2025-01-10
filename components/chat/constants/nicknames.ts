export const NICKNAMES = [
    'FROST',    
    'SAGE',    
    'SKY',     
    'NORTH',    
    'WAVE',   
    'DUSK',     
    'DAWN',    
    'MIST',     
    'SNOW',     
    'RAIN',        
    'ASH',      
    'STAR',       
    'CLOUD',    
    'LEAF',      
    'ZEN',      
    'AURA',      
    'REEF',     
    'VALE', 
    'MOON',     
    'PINE',    
    'PEAK',      
    'FLARE',        
    'CLIFF',           
    'PRISM',        
    'SWIFT'      
] as const;

export type Nickname = typeof NICKNAMES[number];
