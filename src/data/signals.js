export const SIGNALS = [
  // Health
  { id: 'sig-001', dimension: 'health', timestamp: '2026-06-11T08:00:00Z', content: 'Knee Procedure scheduled @ St. Jude Center.', source: 'Medical Portal' },
  { id: 'sig-002', dimension: 'health', timestamp: '2026-06-11T10:30:00Z', content: 'Post-op PDF: "Must not fly for 36 hours post-anesthesia due to DVT risk."', source: 'Medical Portal' },
  { id: 'sig-003', dimension: 'health', timestamp: '2026-06-10T22:00:00Z', content: 'Sleep tracking: 5.4h. Recovery capacity: Limited.', source: 'Health App' },
  
  // Travel
  { id: 'sig-004', dimension: 'travel', timestamp: '2026-06-11T19:30:00Z', content: 'Flight UA242: SFO -> JFK (Confirmed).', source: 'Gmail' },
  { id: 'sig-005', dimension: 'travel', timestamp: '2026-06-07T11:00:00Z', content: 'Travel receipt: United Airlines UA242.', source: 'Gmail' },
  
  // Integrity
  { id: 'sig-006', dimension: 'integrity', timestamp: '2026-06-12T09:00:00Z', content: 'Acquisition Closing: Physical presence required.', source: 'Legal Archive' },
  { id: 'sig-007', dimension: 'integrity', timestamp: '2026-06-12T09:00:00Z', content: 'Clause 4.2: $250,000 valuation risk if signing is missed.', source: 'Legal Archive' },
  { id: 'sig-008', dimension: 'integrity', timestamp: '2026-06-12T09:00:00Z', content: 'Clause 8.1: Remote execution allowed with medical cert.', source: 'Legal Archive' },
  { id: 'sig-009', dimension: 'integrity', timestamp: '2026-06-11T15:00:00Z', content: 'Signature needed: Leo\'s field trip permission.', source: 'School Portal' },
  
  // Money
  { id: 'sig-010', dimension: 'money', timestamp: '2026-06-11T12:00:00Z', content: 'Escrow funding deadline: Friday 12:00 PM.', source: 'Finance App' },
  
  // Family
  { id: 'sig-011', dimension: 'family', timestamp: '2026-06-10T16:45:00Z', content: 'Message from Mom: "Thinking of you for tomorrow\'s surgery!"', source: 'Messages' },
  
  // Memory (Historical)
  { id: 'sig-012', dimension: 'memory', timestamp: '2022-06-25T10:00:00Z', content: 'Flight LIS -> SFO (Travel Archive).', source: 'Life History Archive' },
  { id: 'sig-013', dimension: 'memory', timestamp: '2022-06-11T13:30:00Z', content: 'Receipt: Brunch @ Pasteis de Belém, Lisbon.', source: 'Life History Archive' },
  { id: 'sig-014', dimension: 'memory', timestamp: '2022-06-11T09:00:00Z', content: 'Calendar: Family Brunch - Belém.', source: 'Life History Archive' }
];
