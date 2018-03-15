var resourceTypes = [
    'Account',
    'ActivityDefinition',
    'AdverseEvent',
    'AllergyIntolerance',
    'Appointment',
    'AppointmentResponse',
    'AuditEvent',
    'Basic',
    'Binary',
    'BodySite',
    'Bundle',
    'CapabilityStatement',
    'CarePlan',
    'CareTeam',
    'ChargeItem',
    'Claim',
    'ClaimResponse',
    'ClinicalImpression',
    'CodeSystem',
    'Communication',
    'CommunicationRequest',
    'CompartmentDefinition',
    'Composition',
    'ConceptMap',
    'Condition',
    'Consent',
    'Contract',
    'Coverage',
    'DataElement',
    'DetectedIssue',
    'Device',
    'DeviceComponent',
    'DeviceMetric',
    'DeviceRequest',
    'DeviceUseStatement',
    'DiagnosticReport',
    'DocumentManifest',
    'DocumentReference',
    'DomainResource',
    'EligibilityRequest',
    'EligibilityResponse',
    'Encounter',
    'Endpoint',
    'EnrollmentRequest',
    'EnrollmentResponse',
    'EpisodeOfCare',
    'ExpansionProfile',
    'ExplanationOfBenefit',
    'FamilyMemberHistory',
    'Flag',
    'Goal',
    'GraphDefinition',
    'Group',
    'GuidanceResponse',
    'HealthcareService',
    'ImagingManifest',
    'ImagingStudy',
    'Immunization',
    'ImmunizationRecommendation',
    'ImplementationGuide',
    'Library',
    'Linkage',
    'List',
    'Location',
    'Measure',
    'MeasureReport',
    'Media',
    'Medication',
    'MedicationAdministration',
    'MedicationDispense',
    'MedicationRequest',
    'MedicationStatement',
    'MessageDefinition',
    'MessageHeader',
    'NamingSystem',
    'NutritionOrder',
    'Observation',
    'OperationDefinition',
    'OperationOutcome',
    'Organization',
    'Parameters',
    'Patient',
    'PaymentNotice',
    'PaymentReconciliation',
    'Person',
    'PlanDefinition',
    'Practitioner',
    'PractitionerRole',
    'Procedure',
    'ProcedureRequest',
    'ProcessRequest',
    'ProcessResponse',
    'Provenance',
    'Questionnaire',
    'QuestionnaireResponse',
    'ReferralRequest',
    'RelatedPerson',
    'RequestGroup',
    'ResearchStudy',
    'ResearchSubject',
    'Resource',
    'RiskAssessment',
    'Schedule',
    'SearchParameter',
    'Sequence',
    'ServiceDefinition',
    'Slot',
    'Specimen',
    'StructureDefinition',
    'StructureMap',
    'Subscription',
    'Substance',
    'SupplyDelivery',
    'SupplyRequest',
    'Task',
    'TestReport',
    'TestScript',
    'ValueSet',
    'VisionPrescription'
];

var resourceTypeMap = resourceTypes.reduce(function(map, item){
    map[item.toLowerCase()] = item;
    return map
}, {});


function ResourceHelper() {

}

ResourceHelper.prototype.resourceTypes = resourceTypes;

ResourceHelper.prototype.capitalisedType = function(type){
    function maintainCompatibility(type){
        if (type.toLowerCase() === 'document'){
            return 'Bundle';
        }

        return type;
    }

    return resourceTypeMap[maintainCompatibility(type).toLowerCase()];
};

module.exports = ResourceHelper;