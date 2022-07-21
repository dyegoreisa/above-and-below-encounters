import * as EncounterBase from '../assets/encounters.json';

const lpad = (char) => {
    let width = 3;
    return "enc" + (new Array(width).join("0") + char).slice(-width);
}

export const findEncounterByNum = (encounterNum) => {
    let encounterId = lpad(encounterNum);
    return EncounterBase[encounterId];
}

export const findEncounterById = (encounterId) => {
    return EncounterBase[encounterId];
}
