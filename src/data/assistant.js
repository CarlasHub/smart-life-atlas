export const PERSONAS = [
  { id: 'calm', label: 'Calm Guide', desc: 'Supportive, steady, and focused on well-being.' },
  { id: 'exec', label: 'Executive Assistant', desc: 'Efficient, proactive, and focused on obligations.' },
  { id: 'coach', label: 'Warm Coach', desc: 'Encouraging, empathetic, and focused on growth.' },
  { id: 'analyst', label: 'Direct Analyst', desc: 'Precise, objective, and focused on evidence.' }
];

export const MOCK_MEMORY = {
  lisbon_2022: {
    question: 'Where was I on 11 June 2022?',
    answer: 'Likely Lisbon, Portugal.',
    likelyLocation: 'Belém, Lisbon, Portugal',
    confidence: 0.82,
    narrative: 'Your signals show a family brunch in Belém and a receipt from Pasteis de Belém. A life-history travel archive also places you in Lisbon around that date.',
    uncertainty: 'Atlas does not have GPS-level location history for that day, so this answer is based on calendar, receipt, and archive signals.',
    evidence: [
      { type: 'Calendar', detail: 'Family Brunch - Belém', source: 'Life History' },
      { type: 'Receipt', detail: 'Pasteis de Belém, Lisbon', source: 'Life History' },
      { type: 'Travel Archive', detail: 'Lisbon trip records appear later that month', source: 'Life History' }
    ],
    timeline: [
      { time: '09:00', title: 'Family brunch appears', detail: 'Calendar entry names Belém as the location.' },
      { time: '13:30', title: 'Receipt confirms Lisbon context', detail: 'Pasteis de Belém purchase supports the location.' },
      { time: 'Later in June', title: 'Travel archive supports the trip', detail: 'Life History includes Lisbon travel records around the same period.' }
    ]
  }
};

export const PRESET_QUERIES = [
  { id: 'forgetting', text: 'What am I forgetting?' },
  { id: 'risky', text: 'Why is tomorrow risky?' },
  { id: 'next', text: 'What should I do next?' },
  { id: 'lisbon', text: 'Where was I on 11 June 2022?' },
  { id: 'evidence', text: 'What evidence supports this?' }
];

export function getAssistantResponse(queryId, activeDimensions, persona = 'calm') {
  const isConnected = (dim) => activeDimensions.includes(dim);
  const missingSourceResponse = 'I cannot answer that because the required source is not connected.';
  
  const prefixes = {
    calm: 'I reviewed the approved signals. ',
    exec: 'Status report: ',
    coach: 'I am looking out for your day. ',
    analyst: 'Analysis complete. '
  };

  const prefix = prefixes[persona];

  switch (queryId) {
    case 'forgetting':
      if (!isConnected('integrity') || !isConnected('family')) return missingSourceResponse;
      return `${prefix}Leo's field trip permission signature is due tomorrow afternoon. It is not the highest risk item, but it is easy to finish before the medical and legal timeline gets busy.`;
    
    case 'risky':
      if (!isConnected('health') || !isConnected('travel') || !isConnected('integrity')) return missingSourceResponse;
      return `${prefix}Tomorrow is risky because your 19:30 flight conflicts with the 36-hour no-fly window from your 08:00 procedure, and the Friday 09:00 legal signing has a Friday 12:00 deadline.`;

    case 'next':
      if (!isConnected('health') || !isConnected('travel') || !isConnected('integrity')) return missingSourceResponse;
      return `${prefix}The cleanest next step is to ask counsel to use the Clause 8.1 remote notary workaround and attach the medical restriction before tomorrow evening.`;
      
    case 'lisbon':
      if (!isConnected('memory')) return missingSourceResponse;
      return `${prefix}${MOCK_MEMORY.lisbon_2022.answer} (82% confidence). ${MOCK_MEMORY.lisbon_2022.narrative}`;

    case 'evidence':
      if (!isConnected('health') || !isConnected('travel') || !isConnected('integrity')) return missingSourceResponse;
      return `${prefix}The strongest evidence is the post-op no-fly instruction, the confirmed UA242 flight at 19:30, the Friday 09:00 signing requirement, and Clause 8.1 allowing remote notarization with medical certification.`;

    default:
      return 'How can Atlas support your day, Carla?';
  }
}
