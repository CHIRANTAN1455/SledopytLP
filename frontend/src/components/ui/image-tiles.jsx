import { motion } from 'framer-motion';
import React from 'react';

export function ImageReveal({ leftImage, middleImage, rightImage, leftName, middleName, rightName, leftRole, middleRole, rightRole }) {
    const containerVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                delay: 0.2,
                staggerChildren: 0.2,
            }
        }
    };

    const leftImageVariants = {
        initial: { rotate: 0, x: 0, y: 0 },
        animate: {
            rotate: -8,
            x: -150,
            y: 10,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 1,
            x: -160,
            y: 0,
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    const middleImageVariants = {
        initial: { rotate: 0, x: 0, y: 0 },
        animate: {
            rotate: 6,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 0,
            x: 0,
            y: -10,
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    const rightImageVariants = {
        initial: { rotate: 0, x: 0, y: 0 },
        animate: {
            rotate: -6,
            x: 200,
            y: 20,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12
            }
        },
        hover: {
            rotate: 3,
            x: 200,
            y: 10,
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15
            }
        }
    };

    const ImageCard = ({ variants, image, name, role, zIndex }) => (
        <motion.div
            className="absolute w-48 h-64 origin-bottom-right overflow-hidden rounded-xl shadow-2xl bg-slate-900 border border-white/10 cursor-pointer"
            variants={variants}
            whileHover="hover"
            animate="animate"
            style={{ zIndex }}
        >
            <div className="relative w-full h-full">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-40 object-cover"
                />
                <div className="p-3 bg-slate-900">
                    <p className="text-white font-semibold text-sm truncate">{name}</p>
                    <p className="text-blue-400 text-xs truncate">{role}</p>
                </div>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            className="relative flex items-center justify-center w-[500px] h-80"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <ImageCard variants={leftImageVariants} image={leftImage} name={leftName} role={leftRole} zIndex={30} />
            <ImageCard variants={middleImageVariants} image={middleImage} name={middleName} role={middleRole} zIndex={20} />
            <ImageCard variants={rightImageVariants} image={rightImage} name={rightName} role={rightRole} zIndex={10} />
        </motion.div>
    );
}

// Single card variant for remaining team members
export function SingleImageCard({ image, name, role, delay = 0 }) {
    return (
        <motion.div
            className="w-48 h-64 overflow-hidden rounded-xl shadow-2xl bg-slate-900 border border-white/10 cursor-pointer"
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: Math.random() > 0.5 ? 3 : -3 }}
            viewport={{ once: true }}
            transition={{ delay, type: "spring", stiffness: 120, damping: 12 }}
            whileHover={{ 
                scale: 1.05, 
                rotate: 0,
                transition: { type: "spring", stiffness: 200, damping: 15 }
            }}
        >
            <div className="relative w-full h-full">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-40 object-cover"
                />
                <div className="p-3 bg-slate-900">
                    <p className="text-white font-semibold text-sm truncate">{name}</p>
                    <p className="text-blue-400 text-xs truncate">{role}</p>
                </div>
            </div>
        </motion.div>
    );
}

export default ImageReveal;
