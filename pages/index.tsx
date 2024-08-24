import { FormEvent, useState } from "react";
import generateSendWork from "../lib/promisifyNanoWebGLPoW";
import getTxnData from "../lib/getTxnData";
import {
    addressRegex,
    donationAddress,
    email,
    faucetAddress,
    faucetAmountMaxInNano,
    faucetAmountMinInNano,
    faucetAmountPercentage,
    fediverse,
    github,
    nanolookerBaseUrl,
    twitter,
} from "../lib/constants";

const Home = () => {
    const [step, setStep] = useState<"info" | "work" | "send">();
    const [hash, setHash] = useState<string>();
    const [receivingAll, setReceivingAll] = useState(false);

    const onRequestNano = async (address: string) => {
        setHash(undefined);
        setStep("info");

        const { previousHash } = await getTxnData(address);

        setStep("work");
        const work = await generateSendWork(previousHash);
        setStep("send");

        const sendNanoRes = await fetch("/api/sendNano", {
            body: JSON.stringify({ address, work }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await sendNanoRes.json();

        if (!sendNanoRes.ok || "error" in data)
            throw new Error("Failed to send test nano, please try again");

        setHash(data.hash);
        setStep(undefined);
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const address = data.get("xno-address");

        if (address === null || !addressRegex.test(address as string))
            alert("Insert a valid address");
        else {
            try {
                await onRequestNano(address as string);
            } catch (e) {
                setStep(undefined);
                if (e instanceof Error)
                    alert(`${e.message}. Please try again!`);
                else alert(e);
            }
        }
    };

    return (
        <>
            <h1>Bitcoin Nano faucet</h1>

            <main>
                <div>
                    <h2>
                        Pays {faucetAmountPercentage}% of the faucet balance in
                        Bitcoin Nano Wallet (min. {faucetAmountMinInNano} and max.
                        {faucetAmountMaxInNano} BTCO)
                    </h2>
                    <h3>Please be nice with the faucet, thanks! 🥰</h3>
                    {step && (
                        <h3>
                            {step === "info"
                                ? "Getting faucet account info..."
                                : step === "work"
                                ? "Generating work for your block, please keep this tab open!"
                                : "Signing and sending your block..."}
                        </h3>
                    )}
                </div>
                <form onSubmit={onSubmit}>
                    <input
                        name="xno-address"
                        id="xno-address"
                        type="text"
                        maxLength={65}
                        autoComplete="off"
                        autoCorrect="off"
                        autoFocus
                        required
                        placeholder="Insert your btco_123 address here"
                    />
                    <button disabled={!!step} type="submit">
                        {!step ? "Receive" : <div id="spin"></div>}
                    </button>
                </form>

                {hash && (
                    <a
                        id="faucet-drop-link"
                        href={`${nanolookerBaseUrl}/block/${hash}`}
                    >
                        You can see your transaction here, but be sure to set
                        the node&apos;s URL to a test node in the settings!
                    </a>
                )}

                <button
                    id="receive-all"
                    disabled={receivingAll}
                    onClick={async () => {
                        setReceivingAll(true);
                        await fetch("/api/receiveAll", { method: "POST" });
                        setReceivingAll(false);
                    }}
                >
                    {!receivingAll ? (
                        "Try to receive all receivable txns"
                    ) : (
                        <div id="spin"></div>
                    )}
                </button>
            </main>

            <footer>
            </footer>
        </>
    );
};

export default Home;
