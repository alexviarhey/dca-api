



export interface IPreventiveActions {
    motivationByRiskFactorsAndHygieneEducation: boolean
    professionalHygiene: boolean
    other: string | null
}


//TODO  check types??
export interface ITherapeuticTreatment {
    replacementOfFillings: string | null
    reatmentOfCariesAndNonCariousLesions: string | null
    endodonticTreatment: string | null
    treatmentOfDiseasesOfTheOralMucosa: string | null
    other: string | null
}

//TODO  check types?? i htink need thees numbers types
export interface ISurgicalTreatment {
    extractionOfTeethToots: number[] | null
    outpatientSurgicalInterventionsOnSoftTissues: string | null
    outpatientSurgicalInterventionsOnTheBonesOfTheFacialSkeleton: string | null
    other: string | null
}



export interface IGeneralTreatmentPlanSchema {
    emergencyCare: string | null
    preventiveActions: IPreventiveActions
    therapeuticTreatment: ITherapeuticTreatment | null
    surgicalTreatment: ISurgicalTreatment | null
    orthopedicTreatment: string | null
    orthodonticTreatment: string | null
    additionalDiagnosticMeasures: string | null
    consultationOfOtherSpecialists: string | null
}