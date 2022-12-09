use crate::services::configuration::ConfigurationService;

pub struct AppState {
    configuration_service: ConfigurationService,
}

impl AppState {
    pub fn new(configuration_service: ConfigurationService) -> Self {
        Self {
            configuration_service: configuration_service,
        }
    }

    pub fn get_configuration_service(self: &Self) -> &ConfigurationService {
        &self.configuration_service
    }
}
