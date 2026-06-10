export function getMorningNarrative(activeDimensions) {
  if (activeDimensions.length === 0) {
    return 'Good morning, Carla. Choose the life areas Atlas can read, and I will build a calm daily brief from the approved synthetic signals.';
  }

  const hasHealth = activeDimensions.includes('health');
  const hasTravel = activeDimensions.includes('travel');
  const hasIntegrity = activeDimensions.includes('integrity');
  const hasMemory = activeDimensions.includes('memory');

  if (hasHealth && hasTravel && hasIntegrity) {
    return 'Your next 48 hours include recovery, a confirmed flight, and a legal signing. Atlas found a timing conflict and a practical remote notary path before it becomes urgent.';
  }

  if (hasHealth && hasTravel) {
    return 'Your immediate timeline combines medical recovery and travel. Atlas is watching the safety window between your procedure and your confirmed flight.';
  }

  if (hasMemory && activeDimensions.length === 1) {
    return 'Your Memory area is connected. You can ask Atlas about past days, likely locations, and the evidence behind each answer.';
  }

  return 'Your connected areas look steady. Atlas is monitoring approved synthetic signals for hidden dependencies and will keep the wording simple.';
}
