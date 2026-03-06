"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

type Step = "landing" | "email" | "letter" | "done";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSendingAnim, setIsSendingAnim] = useState(false);
  const [isEnvelopeLeaving, setIsEnvelopeLeaving] = useState(false);
  const [isPlaneVisible, setIsPlaneVisible] = useState(false);
  const [isPlaneFlying, setIsPlaneFlying] = useState(false);
  const [isShareToastVisible, setIsShareToastVisible] = useState(false);

  const isEmailValid =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isMessageValid = message.trim().length > 0;

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6 py-10">
      <div className="mx-auto flex w-full max-w-[960px] flex-col items-center justify-between gap-16">
        {/* 1단계: 랜딩 화면 */}
        {step === "landing" && (
          <>
            <section className="flex w-full flex-1 flex-col items-center">
              <div className="flex flex-col items-center gap-6">
                {/* 비행기 아이콘 */}
                <div
                  className="relative h-[23px] w-[31px] animate-rise-in opacity-0"
                  style={{ animationDelay: "0ms" }}
                >
                  <Image
                    src="/plane.png"
                    alt="종이비행기 아이콘"
                    fill
                    sizes="31px"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* 헤더 텍스트 */}
                <div
                  className="text-center text-white animate-rise-in opacity-0"
                  style={{ animationDelay: "80ms" }}
                >
                  <h1
                    className="text-[32px] font-semibold tracking-tight"
                    style={{
                      textShadow: "0 2px 4px rgba(0,0,0,0.07)",
                      fontFamily:
                        '"SeoulHangang CEB", var(--font-pretendard)',
                    }}
                  >
                    미래로 보내는 편지
                  </h1>
                  <p
                    className="mt-3 text-[16px] leading-[1.4] text-white/90"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
                  >
                    1년 뒤 오늘, 열심히 살아갈 나에게
                    <br />
                    어떤 말을 하고 싶나요?
                  </p>
                </div>

                {/* 봉투 이미지 */}
                <div
                  className="mt-10 flex w-full items-center justify-center animate-rise-in opacity-0"
                  style={{ animationDelay: "160ms" }}
                >
                  <div className="relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80">
                    <Image
                      src="/letter.png"
                      alt="편지 봉투"
                      fill
                      sizes="(max-width: 640px) 16rem, (max-width: 768px) 18rem, 20rem"
                      className="object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 시작하기 버튼 */}
            <button
              className="h-14 w-full max-w-[280px] rounded-[12px] bg-[#45BBFF] text-base font-semibold text-white animate-rise-in opacity-0"
              style={{
                animationDelay: "240ms",
                boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => setStep("email")}
            >
              시작하기
            </button>
          </>
        )}

        {/* 2단계: 이메일 수집 */}
        {step === "email" && (
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="flex flex-col items-center gap-8 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              <p
                className="text-center text-[20px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
              >
                편지를 전달할
                <br />
                이메일을 알려주세요
              </p>

              <form
                className="flex w-full max-w-[320px] flex-col items-center gap-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!isEmailValid) return;
                  setStep("letter");
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="이메일을 입력하세요."
                  className="fl-textfield h-[50px] w-[280px] rounded-[12px] bg-[#A5E8FF] bg-opacity-70 px-4 text-[16px] placeholder:text-[#35C7F9] outline-none"
                />

                <button
                  type="submit"
                  disabled={!isEmailValid}
                  className="h-14 w-full max-w-[280px] rounded-[12px] bg-[#45BBFF] text-base font-semibold text-white shadow-[0_10px_24px_rgba(69,187,255,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  다음
                </button>
              </form>
            </div>
          </section>
        )}

        {/* 3단계: 편지 작성 */}
        {step === "letter" && (
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="relative flex w-full max-w-[360px] flex-col items-center gap-8 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              <motion.p
                className="text-center text-[24px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{
                  textShadow: "0 2px 4px rgba(0,0,0,0.07)",
                  fontFamily: '"SeoulHangang CEB", var(--font-pretendard)',
                }}
                initial={false}
                animate={
                  isSendingAnim
                    ? { y: 8, opacity: 0 }
                    : { y: 0, opacity: 1 }
                }
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                1년 후 나에게
              </motion.p>

              <motion.form
                className="z-10 flex w-full flex-col items-center gap-4"
                onSubmit={async (event) => {
                  event.preventDefault();
                  if (!isMessageValid || isSubmitting) return;

                  setIsSubmitting(true);
                  setSubmitError(null);

                  // 현재 시점 기준 정확히 365일 뒤(1년 후)의 시각을 계산
                  const oneYearMs = 365 * 24 * 60 * 60 * 1000;
                  const sendAt = new Date(Date.now() + oneYearMs).toISOString();

                  const { error } = await supabase
                    .from("letters")
                    .insert({ email, title, body: message, send_at: sendAt });

                  if (error) {
                    setSubmitError(error.message ?? "저장에 실패했습니다.");
                    setIsSubmitting(false);
                    return;
                  }

                  setTitle("");
                  setMessage("");
                  setSubmitError(null);

                  // 입력 폼이 봉투 안으로 천천히 내려가는 모션 시작
                  setIsSendingAnim(true);
                  setIsEnvelopeLeaving(false);
                  setIsPlaneVisible(false);
                  setIsPlaneFlying(false);

                  // 편지 폼 모션이 어느 정도 진행된 뒤, 봉투가 내려가며 페이드아웃 (0.8초)
                  setTimeout(() => {
                    setIsEnvelopeLeaving(true);
                  }, 1800);

                  // 봉투 모션이 끝난 뒤, 종이비행기가 아래에서 위로 나타남 (0.8초, fade in)
                  setTimeout(() => {
                    setIsPlaneVisible(true);
                  }, 2800);

                  // 종이비행기가 잠깐 머물렀다가, 화면 위로 날아가는 모션 시작
                  setTimeout(() => {
                    setIsPlaneFlying(true);
                  }, 3600);

                  // 종이비행기 모션까지 끝난 뒤에 done 화면으로 전환
                  setTimeout(() => {
                    setIsSendingAnim(false);
                    setIsPlaneVisible(false);
                    setIsPlaneFlying(false);
                    setIsSubmitting(false);
                    setStep("done");
                  }, 6000);
                }}
                initial={false}
                animate={
                  isSendingAnim
                    ? { y: "40vh", opacity: 0 }
                    : { y: 0, opacity: 1 }
                }
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  opacity: { duration: 1, ease: "easeOut" },
                }}
                style={
                  isSendingAnim
                    ? {
                        WebkitMaskImage:
                          "linear-gradient(to bottom, black 55%, transparent 85%)",
                        maskImage:
                          "linear-gradient(to bottom, black 55%, transparent 85%)",
                      }
                    : undefined
                }
              >
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="제목을 입력하세요."
                  className="fl-textfield h-[50px] w-full rounded-[12px] bg-[#A5E8FF] px-4 text-[16px] placeholder:text-[#35C7F9] outline-none"
                />

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="미래의 나에게 편지를 적어보세요."
                  className="fl-textfield h-[320px] w-full resize-none rounded-[18px] bg-[#A5E8FF] px-4 py-3 text-[16px] placeholder:text-[#35C7F9] outline-none overflow-y-auto"
                />

                {submitError && (
                  <p className="w-full text-center text-sm text-red-600">
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={!isMessageValid || isSubmitting}
                  className="mt-30 h-14 w-full max-w-[280px] rounded-[12px] bg-[#45BBFF] text-base font-semibold text-white shadow-[0_10px_24px_rgba(69,187,255,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "보내는 중..." : "편지 보내기"}
                </button>
              </motion.form>
            </div>
          </section>
        )}

        {/* 완료 화면 */}
        {step === "done" && (
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="flex flex-col items-center gap-5 text-center text-white animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              <div className="mt-10 relative h-[23px] w-[31px]">
                <Image
                  src="/plane.png"
                  alt="종이비행기 아이콘"
                  fill
                  sizes="31px"
                  className="mx-auto object-contain"
                />
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <h2
                  className="text-[28px] font-semibold tracking-tight"
                  style={{
                    textShadow: "0 2px 4px rgba(0,0,0,0.07)",
                    fontFamily: '"SeoulHangang CEB", var(--font-pretendard)',
                  }}
                >
                  편지가 가고있어요
                </h2>
                <p className="px-6 text-[16px] leading-relaxed text-white/90"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
                >
                  1년 후 도착할 나의 편지를
                  <br />
                  기다려보세요.
                </p>
              </div>

              <button
                className="mt-20 flex h-14 w-[280px] items-center justify-center gap-2 rounded-[12px] bg-[#45BBFF] text-base font-semibold text-white shadow-[0_10px_24px_rgba(69,187,255,0.4)]"
                onClick={() => {
                  setStep("landing");
                  setTitle("");
                  setMessage("");
                  setSubmitError(null);
                  setIsSendingAnim(false);
                  setIsSubmitting(false);
                  setIsEnvelopeLeaving(false);
                  setIsPlaneVisible(false);
                  setIsPlaneFlying(false);
                }}
              >
                <span>다시 보내기</span>
              </button>

              <button
                className="mt-0 flex h-14 w-[280px] items-center justify-center gap-2 rounded-[12px] bg-[#0F84CA] text-base font-semibold text-white"
                onClick={async () => {
                  try {
                    const shareUrl =
                      typeof window !== "undefined"
                        ? window.location.href
                        : "https://futureletter.app";

                    const shareText =
                      "1년 후 나에게 편지를 보내보세요";

                    const ua =
                      typeof navigator !== "undefined"
                        ? navigator.userAgent || ""
                        : "";
                    const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet/i.test(
                      ua,
                    );

                    // 1) 모바일/태블릿: 네이티브 공유 시트
                    if (isMobileOrTablet && navigator.share) {
                      await navigator.share({
                        title: "미래로 보내는 편지",
                        text: shareText,
                        url: shareUrl,
                      });
                      return;
                    }

                    // 2) PC 또는 share 미지원: URL 클립보드 복사 + 토스트
                    if (navigator.clipboard) {
                      await navigator.clipboard.writeText(shareUrl);
                      setIsShareToastVisible(true);
                      setTimeout(() => {
                        setIsShareToastVisible(false);
                      }, 2000);
                    } else {
                      alert(
                        "이 브라우저에서는 공유를 지원하지 않아요. 주소창의 URL을 복사해서 공유해 주세요.",
                      );
                    }
                  } catch (error) {
                    console.error("share failed", error);
                  }
                }}
              >
                <span>친구와 공유하기</span>
              </button>
            </div>
          </section>
        )}
      </div>

      {/* 봉투 배경 & 종이비행기: 편지 작성 화면에서만, 뷰포트 맨 하단에 고정 */}
      {step === "letter" && (
        <div
          className="pointer-events-none fixed bottom-0 left-1/2 -translate-x-1/2 z-[-10] flex items-end justify-center overflow-hidden"
          style={{
            width: "min(100vw, 425px)",
            height: "100vh",
          }}
        >
          <div className="relative flex h-full w-full items-end justify-center">
            {/* 봉투 */}
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={
                isEnvelopeLeaving
                  ? { y: 40, opacity: 0 }
                  : { y: 0, opacity: 1 }
              }
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <img
                src="/envelope.png"
                alt="편지 봉투 배경"
                className="w-full h-auto object-contain object-bottom"
                style={{ transform: "translateY(10%)" }}
              />
            </motion.div>

            {/* 종이비행기: 봉투가 사라진 뒤, 아래에서 위로 나타나고 위로 날아가는 모션 */}
            {isPlaneVisible && (
              <motion.img
                src="/paperplane.png"
                alt="종이비행기"
                className="absolute bottom-[0%] left-1/2 w-[90%] max-w-[440px] h-auto -translate-x-1/2 object-contain"
                initial={{ y: 0, opacity: 0, scale: 1 }}
                animate={
                  isPlaneFlying
                    ? {
                        y: ["0px", "0px", "-90vh"],
                        scale: [1, 1, 0.1],
                        opacity: [1, 1, 0],
                      }
                    : { y: 0, opacity: 1, scale: 1 }
                }
                transition={
                  isPlaneFlying
                    ? {
                        duration: 1.2,
                        ease: "easeIn",
                        times: [0, 0.25, 1],
                      }
                    : { duration: 0.8, ease: "easeOut" }
                }
              />
            )}
          </div>
        </div>
      )}

      {/* PC에서 공유 링크 복사 시 토스트 메시지 */}
      {isShareToastVisible && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-black/75 px-4 py-2 text-xs text-white shadow-lg">
          링크를 복사했어요. 친구에게 붙여넣어 공유해 주세요.
        </div>
      )}
    </main>
  );
}

