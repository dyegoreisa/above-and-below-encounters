import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import EncounterPage from './pages/encounter';
import AdventurePage from './pages/adventure';
import RewardPage from './pages/reward';
import FailurePage from './pages/failure';

export default createAppContainer(
    createSwitchNavigator({
        EncounterPage,
        AdventurePage,
        RewardPage,
        FailurePage
    })
);