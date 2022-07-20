import * as EncounterBase from './assets/encounters.json';
import EncounterComponent from './components/encounter';

export default function App() {
  return <EncounterComponent encounterBase={EncounterBase} />;
}
