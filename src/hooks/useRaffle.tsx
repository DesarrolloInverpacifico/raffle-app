import {
  allRaffles,
  getCriterias,
  getParticipants,
  getPrizes,
  getRaffle,
  resetParticipants,
  saveParticipants,
  saveRaffle,
  updateWinner,
} from "@/services/rafflesService";
import { raffleData, RaffleType } from "@/types/raffle";
import { RaffleCriteria } from "@/types/raffle-criteria";
import { RaffleParticipant } from "@/types/raffle-participant";
import { RafflePrize } from "@/types/raffle-prize";
import { useState } from "react";

export const useRaffle = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [raffles, setRaffles] = useState<RaffleType[]>([]);
  const [raffle, setRaffle] = useState<RaffleType>();
  const [participants, setParticipants] = useState<RaffleParticipant[]>([]);
  const [prizes, setPrizes] = useState<RafflePrize[]>([]);
  const [criterias, setCriterias] = useState<RaffleCriteria[]>([]);

  const listRaffles = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await allRaffles();
      setRaffles(response.data.data);
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const storeRaffle = async (data: raffleData) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await saveRaffle(data);
      return Promise.resolve(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const showRaffle = async (id: string) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await getRaffle(id);
      setRaffle(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const showParticipants = async (id: string) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await getParticipants(id);
      setParticipants(response.data);

      return Promise.resolve(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const restoreParticipants = async (id: string) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await resetParticipants(id);
      setParticipants(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const showPrizes = async (id: string) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await getPrizes(id);
      setPrizes(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const showCriterias = async (id: string) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await getCriterias(id);
      setCriterias(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const storeParticipants = async (id: string, data: FormData) => {
    setIsLoading(true);
    setErrors({});

    console.log("Entro al hook");
    try {
      const response = await saveParticipants(id, data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const storeWinner = async (id: string, data: { people_id: string }) => {
    setIsLoading(true);
    setErrors({});

    try {
      const response = await updateWinner(id, data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errors,
    raffles,
    raffle,
    participants,
    prizes,
    criterias,
    listRaffles,
    showRaffle,
    showParticipants,
    storeParticipants,
    restoreParticipants,
    showPrizes,
    showCriterias,
    storeRaffle,
    storeWinner,
  };
};
