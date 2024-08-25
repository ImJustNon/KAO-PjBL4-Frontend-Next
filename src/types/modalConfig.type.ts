import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ModalConfig {
    modalIcon: IconDefinition | "";
    modalIconColor: string;
    modalTitle: string;
    modalDescription: string | unknown;
}