use crate::services::configuration::ConfigurationService;

pub struct AppState<'a> {
    configuration_service: &'a ConfigurationService,
}

impl<'a> AppState<'a> {
    pub fn new(configuration_service: &'a ConfigurationService) -> Self {
        Self {
            configuration_service: configuration_service,
        }
    }

    pub fn get_configuration_service(self: &Self) -> &ConfigurationService {
        self.configuration_service
    }
}
