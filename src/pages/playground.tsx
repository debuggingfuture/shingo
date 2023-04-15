import { Web3Button } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { LensPlayground } from "../components/LensPlayground";
import { LENS_CONTRACT_ABI, LENS_CONTRACT_ADDRESS } from "../const/contracts";
import { useCreatePost } from "../lib/useCreatePost";
import styles from "../styles/Create.module.css";

export default function Playground() {
    // const [image, setImage] = useState<File | null>(null);

    return (
        <div >

            <LensPlayground />
        </div>
    );
}
