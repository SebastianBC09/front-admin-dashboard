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
