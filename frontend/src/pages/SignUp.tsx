import React, { useState } from 'react'

function SignUp() {

    const [email, setEmail] = useState<string>("");
    const [step, setStep] = useState<number>(1)

    return (
        <div>

            <div className="min-h-screen flex items-center justify-center bg-[#090909] px-5">

                {step == 0 &&
                    <>
                        <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#101010] p-8 sm:p-10 shadow-2xl shadow-black/40">

                            <div className="mb-8">
                                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg font-medium text-white">
                                    {"</>"}
                                </div>

                                <h1 className="text-3xl font-semibold tracking-tight text-white">
                                    Get started
                                </h1>

                                <p className="mt-3 text-sm leading-6 text-zinc-400">
                                    Enter your email address and Verify your email.
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="signup-email"
                                    className="mb-2 block text-sm font-medium text-zinc-300"
                                >
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    placeholder="name@example.com"
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-zinc-600 hover:border-white/20 focus:border-zinc-500 focus:ring-2 focus:ring-white/5"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </div>

                            <button
                                type="button"
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black transition duration-200 hover:bg-zinc-200 active:scale-[0.99]"
                            >
                                Verify Your Email
                                <span className="text-base">→</span>
                            </button>

                            <p className="mt-6 text-center text-xs text-zinc-500">
                                Your ideas. Your workspace.
                            </p>

                        </div>
                    </>
                }

                {step == 1 &&
                    <>
                        <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#101010] p-8 sm:p-10 shadow-2xl shadow-black/40">

                            <div className="mb-8">
                                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg font-medium text-white">
                                    {"</>"}
                                </div>

                                <h1 className="text-3xl font-semibold tracking-tight text-white">
                                    Verify your email
                                </h1>

                                <p className="mt-3 text-sm leading-6 text-zinc-400">
                                    Enter the 4-digit code sent to your email address.
                                </p>
                            </div>

                            <div>
                                <label className="mb-3 block text-sm font-medium text-zinc-300">
                                    Verification code
                                </label>

                                <div className="flex gap-3">
                                    {[0, 1, 2, 3].map((digit) => (
                                        <input
                                            key={digit}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            aria-label={`OTP digit ${digit + 1}`}
                                            className="h-14 w-full min-w-0 rounded-xl border border-white/10 bg-black/40 text-center text-xl font-semibold text-white outline-none transition hover:border-white/20 focus:border-zinc-500 focus:ring-2 focus:ring-white/5"
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.99]"
                            >
                                Verify email
                                <span className="text-base">→</span>
                            </button>

                            <p className="mt-6 text-center text-sm text-zinc-500">
                                Didn't receive the code?{" "}
                                <button
                                    type="button"
                                    className="font-medium text-white transition hover:text-zinc-300"
                                >
                                    Resend OTP
                                </button>
                            </p>

                        </div>
                    </>
                }

                {step == 2 &&
                    <>
                        <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#101010] p-8 sm:p-10 shadow-2xl shadow-black/40">

                            <div className="mb-8">
                                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lg font-medium text-white">
                                    {"</>"}
                                </div>

                                <h1 className="text-3xl font-semibold tracking-tight text-white">
                                    Get started
                                </h1>

                                <p className="mt-3 text-sm leading-6 text-zinc-400">
                                    Enter your email address and Verify your email.
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="signup-email"
                                    className="mb-2 block text-sm font-medium text-zinc-300"
                                >
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    placeholder="name@example.com"
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-zinc-600 hover:border-white/20 focus:border-zinc-500 focus:ring-2 focus:ring-white/5"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </div>

                            <button
                                type="button"
                                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black transition duration-200 hover:bg-zinc-200 active:scale-[0.99]"
                            >
                                Verify Your Email
                                <span className="text-base">→</span>
                            </button>

                            <p className="mt-6 text-center text-xs text-zinc-500">
                                Your ideas. Your workspace.
                            </p>

                        </div>
                    </>
                }

            </div>

        </div>
    )
}

export default SignUp