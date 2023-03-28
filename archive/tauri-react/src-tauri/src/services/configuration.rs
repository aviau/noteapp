pub struct ConfigurationService {}

impl ConfigurationService {
    pub fn get(self: &Self, key: String) -> Result<String, String> {
        match key.as_str() {
            "vault.last_active" => Ok("mock-vault".to_string()),
            _ => Err(format!("Unknown configuration key: {}", key,).to_string()),
        }
    }
}
