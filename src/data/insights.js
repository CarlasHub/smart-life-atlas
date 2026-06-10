export const INSIGHTS = [
  {
    id: 'ins-post-op',
    title: 'Post-Op Compliance Trap',
    summary: 'Atlas found a timing conflict that needs attention before tomorrow evening.',
    narrative: 'Atlas found a timing conflict that needs attention before tomorrow evening. Your procedure is at 08:00, your medical instructions say no flying for 36 hours, and your confirmed flight leaves at 19:30. That would put your Friday 09:00 legal signing and Friday 12:00 deadline at risk.',
    impactSummary: '$250,000 valuation risk if the signing is missed without invoking the approved workaround.',
    workaround: 'Clause 8.1 remote notary workaround',
    points: [
      'Procedure at 08:00 on Thursday.',
      'No flying for 36 hours after anesthesia.',
      'Flight at 19:30 on Thursday, only 11.5 hours later.',
      'Legal signing Friday 09:00 with legal deadline Friday 12:00.',
      '$250,000 valuation risk if the closing is missed.'
    ],
    timeline: [
      { time: 'Thursday 08:00', title: 'Procedure begins', detail: 'Medical Portal confirms the scheduled post-op procedure.' },
      { time: 'Thursday 10:30', title: 'Recovery instruction appears', detail: 'Post-op PDF says no flying for 36 hours after anesthesia.' },
      { time: 'Thursday 19:30', title: 'Flight UA242 departs', detail: 'Travel confirmation places the flight inside the restricted window.' },
      { time: 'Friday 09:00', title: 'Legal signing', detail: 'Legal Archive says physical presence is required unless Clause 8.1 is used.' },
      { time: 'Friday 12:00', title: 'Legal deadline', detail: 'Legal Archive marks the final signing and valuation deadline.' }
    ],
    resolutions: [
      { id: 'res-notary', label: 'Use Clause 8.1 remote notary workaround', desc: 'Ask counsel to trigger the remote notary clause with a medical certificate before the Friday 12:00 deadline.' },
      { id: 'res-flight', label: 'Move the flight outside the recovery window', desc: 'Reschedule UA242 to Saturday morning so the 36-hour no-fly instruction is respected.' }
    ],
    evidence: [
      { id: 'sig-001', category: 'Health', label: 'Procedure at 08:00', context: 'Medical Portal appointment record', detail: 'Knee procedure scheduled for Thursday at 08:00.' },
      { id: 'sig-002', category: 'Health', label: 'No flying for 36 hours', context: 'Post-op instruction PDF', detail: 'Post-anesthesia instructions prohibit flying for 36 hours because of DVT risk.' },
      { id: 'sig-004', category: 'Travel', label: 'Flight at 19:30', context: 'United Airlines confirmation', detail: 'UA242 SFO to JFK is confirmed for Thursday at 19:30.' },
      { id: 'sig-006', category: 'Integrity', label: 'Legal signing Friday 09:00', context: 'Legal Archive signing packet', detail: 'Closing requires presence at 09:00 unless a permitted workaround is invoked.' },
      { id: 'sig-007', category: 'Money', label: '$250,000 valuation risk', context: 'Legal Archive Clause 4.2', detail: 'Missing the closing may trigger a valuation adjustment of $250,000.' },
      { id: 'sig-008', category: 'Integrity', label: 'Clause 8.1 remote notary workaround', context: 'Legal Archive Clause 8.1', detail: 'Remote execution is allowed with medical certification.' }
    ],
    requiredDimensions: ['health', 'travel', 'integrity'],
    confidence: 0.98
  }
];
