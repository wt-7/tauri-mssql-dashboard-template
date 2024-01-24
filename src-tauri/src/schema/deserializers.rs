pub fn deserialize_date<'de, D>(deserializer: D) -> Result<Option<String>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    let s: String = serde::Deserialize::deserialize(deserializer)?;

    let x = s.chars().take_while(|c| c != &'T').collect::<String>();

    Ok(Some(x))
}
