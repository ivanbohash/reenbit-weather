import citiesData from "../mockData/citiesData.json";

export function getImageUrl(name) {
  const cityData = citiesData.filter((city) => city.name === name);
  return cityData[0].imageUrl;
}
