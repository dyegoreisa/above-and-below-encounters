import * as EncounterBase from '../assets/encounters.json';

const lpad = (char) => {
    let width = 3;
    return "enc" + (new Array(width).join("0") + char).slice(-width);
}

export const findEncounterByNum = (encounterNum) => {
    let encounterId = lpad(encounterNum);
    console.log("encounterId", encounterId);
    return EncounterBase[encounterId];
}

export const findEncounterById = (encounterId) => {
    console.log("encounterId", encounterId);
    return EncounterBase[encounterId];
}
