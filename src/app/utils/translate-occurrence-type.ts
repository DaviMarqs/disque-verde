export const handleTranslateOccurrenceType = (type: string) => {
  switch (type) {
    case "DEFORESTATION_BURNINGS":
      return "Desmatamento e Queimadas";
    case "POLLUTION_AIR_WATER_SOIL":
      return "Poluição - Ar, água ou solo";
    case "ILLEGAL_DUMPING":
      return "Despejo ilegal";
    case "FLORA":
      return "Flora";
    case "FAUNA":
      return "Fauna";
    case "ANIMAL_ABUSE":
      return "Maus-tratos animais";
    case "ILLEGAL_HUNTING":
      return "Caça ilegal";
    case "ILLEGAL_TRADE":
      return "Comercio ilegal";
    case "VEGETATION_DAMAGE":
      return "Danos à Vegetação";
    case "PROTECTED_AREAS":
      return "Áreas Protegidas";
    case "APP_INVASION":
      return "Invasão de APP";
    case "ILLEGAL_ACTIVITIES_UC":
      return "Atividades ilegais em Unidades de Conservação";
    case "WATER_RESOURCES":
      return "Recursos Hidricos";
    case "CONTAMINATION":
      return "Contaminação";
    case "ILLEGAL_CONSTRUCTIONS":
      return "Construções irregulares";
    case "PESTICIDE_USE":
      return "Uso de Agrotóxicos";
    case "NOISE_DISTURBANCE":
      return "Ruído e Perturbação";
    case "NOISE_POLLUTION":
      return "Poluição sonora";
    case "OTHERS":
      return "Outros";
    default:
      return type;
  }
};
