import { SignalDTO } from "@/features/signals/dtos";
import { Signal } from "../models";
import z from "zod";

export function parseSignalDTO(signalDto: SignalDTO): Signal {
  return {
    id: signalDto.id,
    title: signalDto.title,
    objectType: signalDto.object_type,
    type: signalDto.type,
    description: signalDto.description,
    tags: signalDto.tags,
    obligations: signalDto.obligations,
    createdAt: z.coerce.date().parse(signalDto.created_at),
    updatedAt: z.coerce.date().parse(signalDto.updated_at),
  };
}
