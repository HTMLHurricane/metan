import { ReadFunctionPostman } from '@/utils/config/crud'
import { IGasStationsResponse } from './types'

export async function getGasStations() {
  return ReadFunctionPostman<IGasStationsResponse>("gas-stations");
}