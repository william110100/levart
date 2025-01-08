export const ADMIN = 1;
export const SPV_TRANSPORT = 2;
export const SPV_QRF = 3;
export const TRANSPORT = 5;
export const QRF = 6;
export const CHIEF_QRF = 7;
export const CHIEF_TRANSPORT = 8;

export const QRF_GROUP = [SPV_QRF, QRF, CHIEF_QRF];
export const TRANSPORT_GROUP = [SPV_TRANSPORT, TRANSPORT, CHIEF_TRANSPORT];
export const CHIEF_GROUP = [CHIEF_TRANSPORT, CHIEF_QRF];
export const SPV_GROUP = [SPV_TRANSPORT, SPV_QRF];
export const MEMBER_GROUP = [QRF, TRANSPORT];
