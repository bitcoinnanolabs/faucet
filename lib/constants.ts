import { convert, Unit } from "btcocurrency";

export const nanolookerBaseUrl =
    process.env.NEXT_PUBLIC_NANOLOOKER_BASE_URL;

export const faucetAddress =
    process.env.NEXT_PUBLIC_FAUCET_ADDRESS;

export const nanoRpcUrl =
    process.env.NEXT_PUBLIC_NANO_RPC_URL;

export const representativeAddress =
    process.env.NEXT_PUBLIC_REPRESENTATIVE_ADDRESS;

export const github =
    process.env.NEXT_PUBLIC_GITHUB;

export const email = process.env.NEXT_PUBLIC_EMAIL;

export const twitter = process.env.NEXT_PUBLIC_TWITTER;


export const donationAddress =
    process.env.NEXT_PUBLIC_DONATION_ADDRESS;

export const faucetAmountPercentage =
    process.env.NEXT_PUBLIC_FAUCET_AMOUNT_PERCENTAGE || "1";

export const faucetAmountMinInNano =
    process.env.NEXT_PUBLIC_FAUCET_AMOUNT_MIN_IN_NANO || "1";

export const faucetAmountMaxInNano =
    process.env.NEXT_PUBLIC_FAUCET_AMOUNT_MAX_IN_NANO || "10";

export const faucetAmountMin = convert(faucetAmountMinInNano, {
    from: Unit.Btco,
    to: Unit.raw,
});

export const toBTCO =
    process.env.NEXT_PUBLIC_BTCOTO;

export const faucetAmountMax = convert(faucetAmountMaxInNano, {
    from: Unit.Btco,
    to: Unit.raw,
});

export const addressRegex =
    /^(btco)_[13]{1}[13456789abcdefghijkmnopqrstuwxyz]{59}$/;
