import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [isVisible, setIsVisible] = useState("");

    useEffect(() => {
        if (flash.message) {
            setIsVisible(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 5000);
        }
    }, [flash.message]);
    return (
        isVisible && (
            <AnimatePresence>
                <motion.div
                    className="fixed right-4 top-4 z-50 rounded-lg border-4 border-emerald-500 bg-white/90 text-emerald-500 p-5 shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center">
                        <AiOutlineCheckCircle className="mr-3 text-4xl" />
                        <p className="text-lg">{flash.message}</p>
                    </div>
                </motion.div>
            </AnimatePresence>
        )
    );
}
