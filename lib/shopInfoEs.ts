import type { ShopInfo } from "./shopInfo";

export const shopInfoEs: ShopInfo = {
  name: "Junior's Auto Repair",
  owner: "Pablo Zaldivar",
  tagline: "Trabajo honesto, precios justos, hecho bien a la primera.",
  description:
    "Sirviendo al centro de Twin Falls y Magic Valley durante más de 13 años. Tratamos cada vehículo como si fuera el nuestro.",
  phone: "(208) 595-2101",
  address: "417 Main Ave E",
  city: "Twin Falls",
  state: "ID",
  zip: "83301",
  get fullAddress() {
    return `${this.address}, ${this.city}, ${this.state} ${this.zip}`;
  },
  hours: {
    weekdays: "Lun–Sáb: 9:00 AM – 5:00 PM",
    sunday: "Cerrado",
    summary: "Lun–Sáb · 9 AM – 5 PM",
  },
  rating: "4.8",
  reviewCount: "146",
  yearsInBusiness: "13",
  services: [
    "Cambios de Aceite",
    "Servicio y Reparación de Frenos",
    "Diagnóstico y Reparación del Motor",
    "Servicio de Transmisión",
    "Sistemas de Aire Acondicionado y Calefacción",
    "Servicio de Llantas y Alineación",
    "Diagnóstico Eléctrico",
    "Mantenimiento Preventivo",
  ],
  about:
    "Junior's Auto Repair ha sido un pilar de la comunidad de Twin Falls durante más de 13 años. Pablo Zaldivar y su familia se dedican a proporcionar reparación automotriz honesta y confiable a precios justos — sin cargos sorpresa, sin trabajos innecesarios.",
  googleMapsUrl:
    "https://maps.google.com/?q=417+Main+Ave+E+Twin+Falls+ID+83301",
  serviceArea:
    "Twin Falls, Jerome, Kimberly, Filer, Buhl, Hansen, Wendell, Gooding, Shoshone, Burley, Rupert, Hagerman — toda Magic Valley",
};
