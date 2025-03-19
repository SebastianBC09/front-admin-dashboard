export interface TypeProperty {
  typeId: string;
  propertyId: string;
}

export interface TypeData {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  properties: TypeProperty[];
}

export interface GetTypesResponse {
  types: TypeData[];
}

export interface PropertyData {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export type Property = Omit<PropertyData, 'createdAt' | 'updatedAt' >

export interface GetPropertiesResponse {
  properties: PropertyData[];
}
