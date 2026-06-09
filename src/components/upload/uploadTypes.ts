export type AddressInput = {
  address: string;
  city: string;
  state: string;
};

export function getFullAddress(input: AddressInput) {
  return `${input.address.trim()}, ${input.city.trim()}, ${input.state.trim()}`;
}

export function isAddressComplete(input: AddressInput) {
  return (
    input.address.trim().length > 0 &&
    input.city.trim().length > 0 &&
    input.state.trim().length === 2
  );
}
