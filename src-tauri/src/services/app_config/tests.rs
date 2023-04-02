use super::config::{AppConfig, VaultConfig};
use super::parser;
use std::collections::HashMap;
use std::error::Error;

#[test]
fn test_deserialize_app_config() -> Result<(), Box<dyn Error>> {
    let config_string = r#"
{
    "vaults": {
        "k3kvj4jfj2j5nfn2": {
            "path": "/Users/hello/vault",
            "ts": 1669245418892,
            "open": true
        }
    }
}
"#;

    let expected_deserialized = AppConfig {
        vaults: HashMap::from([(
            "k3kvj4jfj2j5nfn2".into(),
            VaultConfig {
                path: "/Users/hello/vault".into(),
                open: true,
            },
        )]),
    };

    // Deserialize
    let deserialized_config = parser::deserialize_config(config_string)?;
    assert_eq!(expected_deserialized, deserialized_config);

    // Re-Serialize
    let serialized_config = parser::serialize_config(&deserialized_config)?;
    print!("{}", serialized_config);
    let expected_serialized = r#"{
  "vaults": {
    "k3kvj4jfj2j5nfn2": {
      "path": "/Users/hello/vault",
      "open": true
    }
  }
}"#;
    assert_eq!(expected_serialized, serialized_config);

    Ok(())
}
