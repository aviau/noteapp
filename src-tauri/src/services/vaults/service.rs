use crate::services::app_config::AppConfigService;

pub struct VaultsService<'a> {
    app_config_service: &'a AppConfigService,
}

impl<'a> VaultsService<'a> {
    pub fn new(app_config_service: &'a AppConfigService) -> Self {
        Self {
            app_config_service: app_config_service,
        }
    }
}
