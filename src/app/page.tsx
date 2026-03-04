"use client";

import Image from "next/image";
import { useState } from "react";

type Step = "landing" | "email" | "letter" | "done";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const isEmailValid =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isMessageValid = message.trim().length > 0;

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6 py-10">
      <div className="mx-auto flex w-full max-w-[960px] flex-col items-center justify-between gap-16">
        {step === "landing" && (
          <>
            {/* 1단계: 랜딩 화면 */}
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

                {/* 제목 + 본문 */}
                <div
                  className="text-center text-white animate-rise-in opacity-0"
                  style={{ animationDelay: "80ms" }}
                >
                  <h1
                    className="text-4xl font-semibold tracking-tight"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
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

                {/* 편지 이미지 */}
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
                boxShadow: "0px 2px 12px rgba(0,0,0,0.1)",
              }}
              onClick={() => setStep("email")}
            >
              시작하기
            </button>
          </>
        )}

        {step === "email" && (
          /* 2단계: 이메일 수집 화면 */
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="flex flex-col items-center gap-8 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              {/* 안내 문구 */}
              <p
                className="text-center text-[20px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
              >
                편지를 전달할
                <br />
                이메일을 알려주세요
              </p>

              {/* 이메일 입력 + 버튼 */}
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

        {step === "letter" && (
          /* 3단계: 편지 작성 화면 */
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="relative flex w-full max-w-[360px] flex-col items-center gap-6 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              {/* 헤더 */}
              <p
                className="text-center text-[20px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
              >
                To, 1년 뒤 나에게
              </p>

              {/* 봉투 그래픽 (배경) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-[-80px] flex justify-center">
                <div className="relative h-[220px] w-[320px]">
                  <Image
                    src="/envelope1.png"
                    alt="편지 봉투 배경"
                    fill
                    sizes="320px"
                    className="object-contain opacity-90"
                  />
                  <Image
                    src="/envelope2.png"
                    alt="편지 봉투 하이라이트"
                    fill
                    sizes="320px"
                    className="object-contain opacity-90"
                  />
                </div>
              </div>

              {/* 입력 영역 */}
              <form
                className="z-10 flex w-full flex-col items-center gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!isMessageValid) return;
                  setStep("done");
                }}
              >
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="제목을 입력하세요."
                  className="fl-textfield h-[50px] w-full rounded-[12px] bg-[#A5E8FF] bg-opacity-70 px-4 text-[16px] placeholder:text-[#35C7F9] outline-none"
                />

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="미래의 나에게 편지를 적어보세요."
                  className="fl-textfield h-[180px] w-full resize-none rounded-[18px] bg-[#A5E8FF] bg-opacity-70 px-4 py-3 text-[16px] placeholder:text-[#35C7F9] outline-none overflow-y-auto"
                />

                <button
                  type="submit"
                  disabled={!isMessageValid}
                  className="mt-4 h-14 w-full max-w-[280px] rounded-[12px] bg-[#45BBFF] text-base font-semibold text-white shadow-[0_10px_24px_rgba(69,187,255,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  편지 보내기
                </button>
              </form>
            </div>
          </section>
        )}

        {step === "done" && (
          /* 4단계: 완료 화면 (간단한 플레이스홀더) */
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="flex flex-col items-center gap-4 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              <p
                className="text-center text-[20px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
              >
                편지가 잘 예약되었어요.
                <br />
                1년 뒤, 지금의 나에게 도착할 거예요.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

type Step = "landing" | "email" | "letter" | "done";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const isEmailValid =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isMessageValid = message.trim().length > 0;

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6 py-10">
      <div className="mx-auto flex w-full max-w-[960px] flex-col items-center justify-between gap-16">
        {step === "landing" && (
          <>
            {/* 1단계: 랜딩 화면 */}
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

                {/* 제목 + 본문 */}
                <div
                  className="text-center text-white animate-rise-in opacity-0"
                  style={{ animationDelay: "80ms" }}
                >
                  <h1
                    className="text-4xl font-semibold tracking-tight"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
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

                {/* 편지 이미지 */}
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
                boxShadow: "0px 2px 12px rgba(0,0,0,0.1)",
              }}
              onClick={() => setStep("email")}
            >
              시작하기
            </button>
          </>
        )}

        {step === "email" && (
          /* 2단계: 이메일 수집 화면 */
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="flex flex-col items-center gap-8 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              {/* 안내 문구 */}
              <p
                className="text-center text-[20px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
              >
                편지를 전달할
                <br />
                이메일을 알려주세요
              </p>

              {/* 이메일 입력 + 버튼 */}
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

        {step === "letter" && (
          /* 3단계: 편지 작성 화면 */
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="relative flex w-full max-w-[360px] flex-col items-center gap-6 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              {/* 헤더 */}
              <p
                className="text-center text-[20px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
              >
                To, 1년 뒤 나에게
              </p>

              {/* 봉투 그래픽 (배경) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-[-80px] flex justify-center">
                <div className="relative h-[220px] w-[320px]">
                  <Image
                    src="/envelope1.png"
                    alt="편지 봉투 배경"
                    fill
                    sizes="320px"
                    className="object-contain opacity-90"
                  />
                  <Image
                    src="/envelope2.png"
                    alt="편지 봉투 하이라이트"
                    fill
                    sizes="320px"
                    className="object-contain opacity-90"
                  />
                </div>
              </div>

              {/* 입력 영역 */}
              <form
                className="z-10 flex w-full flex-col items-center gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!isMessageValid) return;
                  setStep("done");
                }}
              >
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="제목을 입력하세요."
                  className="fl-textfield h-[50px] w-full rounded-[12px] bg-[#A5E8FF] bg-opacity-70 px-4 text-[16px] placeholder:text-[#35C7F9] outline-none"
                />

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="미래의 나에게 편지를 적어보세요."
                  className="fl-textfield h-[180px] w-full resize-none rounded-[18px] bg-[#A5E8FF] bg-opacity-70 px-4 py-3 text-[16px] placeholder:text-[#35C7F9] outline-none overflow-y-auto"
                />

                <button
                  type="submit"
                  disabled={!isMessageValid}
                  className="mt-4 h-14 w-full max-w-[280px] rounded-[12px] bg-[#45BBFF] text-base font-semibold text-white shadow-[0_10px_24px_rgba(69,187,255,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  편지 보내기
                </button>
              </form>
            </div>
          </section>
        )}

        {step === "done" && (
          /* 4단계: 완료 화면 (간단한 플레이스홀더) */
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="flex flex-col items-center gap-4 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              <p
                className="text-center text-[20px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
              >
                편지가 잘 예약되었어요.
                <br />
                1년 뒤, 지금의 나에게 도착할 거예요.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

type Step = "landing" | "email" | "letter" | "done";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const isEmailValid =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isMessageValid = message.trim().length > 0;

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6 py-10">
      <div className="mx-auto flex w-full max-w-[960px] flex-col items-center justify-between gap-16">
        {step === "landing" && (
          <>
            {/* 1단계: 랜딩 화면 */}
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

                {/* 제목 + 본문 */}
                <div
                  className="text-center text-white animate-rise-in opacity-0"
                  style={{ animationDelay: "80ms" }}
                >
                  <h1
                    className="text-4xl font-semibold tracking-tight"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
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

                {/* 편지 이미지 */}
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
                boxShadow: "0px 2px 12px rgba(0,0,0,0.10)",
              }}
              onClick={() => setStep("email")}
            >
              시작하기
            </button>
          </>
        )}

        {step === "email" && (
          /* 2단계: 이메일 수집 화면 */
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="flex flex-col items-center gap-8 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              {/* 안내 문구 */}
              <p
                className="text-center text-[20px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
              >
                편지를 전달할
                <br />
                이메일을 알려주세요
              </p>

              {/* 이메일 입력 + 버튼 */}
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

        {step === "letter" && (
          /* 3단계: 편지 작성 화면 */
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="relative flex w-full max-w-[360px] flex-col items-center gap-6 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              {/* 헤더 */}
              <p
                className="text-center text-[20px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
              >
                To, 1년 뒤 나에게
              </p>

              {/* 봉투 그래픽 (배경) */}
              <div className="pointer-events-none absolute inset-x-0 bottom-[-80px] flex justify-center">
                <div className="relative h-[220px] w-[320px]">
                  <Image
                    src="/envelope1.png"
                    alt="편지 봉투 배경"
                    fill
                    sizes="320px"
                    className="object-contain opacity-90"
                  />
                  <Image
                    src="/envelope2.png"
                    alt="편지 봉투 하이라이트"
                    fill
                    sizes="320px"
                    className="object-contain opacity-90"
                  />
                </div>
              </div>

              {/* 입력 영역 */}
              <form
                className="z-10 flex w-full flex-col items-center gap-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!isMessageValid) return;
                  setStep("done");
                }}
              >
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="제목을 입력하세요."
                  className="fl-textfield h-[50px] w-full rounded-[12px] bg-[#A5E8FF] bg-opacity-70 px-4 text-[16px] placeholder:text-[#35C7F9] outline-none"
                />

                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="미래의 나에게 편지를 적어보세요."
                  className="fl-textfield h-[180px] w-full resize-none rounded-[18px] bg-[#A5E8FF] bg-opacity-70 px-4 py-3 text-[16px] placeholder:text-[#35C7F9] outline-none overflow-y-auto"
                />

                <button
                  type="submit"
                  disabled={!isMessageValid}
                  className="mt-4 h-14 w-full max-w-[280px] rounded-[12px] bg-[#45BBFF] text-base font-semibold text-white shadow-[0_10px_24px_rgba(69,187,255,0.6)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  편지 보내기
                </button>
              </form>
            </div>
          </section>
        )}

        {step === "done" && (
          /* 4단계: 완료 화면 (간단한 플레이스홀더) */
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="flex flex-col items-center gap-4 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              <p
                className="text-center text-[20px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
              >
                편지가 잘 예약되었어요.
                <br />
                1년 뒤, 지금의 나에게 도착할 거예요.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

type Step = "landing" | "email";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [email, setEmail] = useState("");

  const isEmailValid =
    email.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6 py-10">
      <div className="mx-auto flex w-full max-w-[960px] flex-col items-center justify-between gap-16">
        {step === "landing" ? (
          <>
            {/* 1단계: 랜딩 화면 */}
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

                {/* 제목 + 본문 */}
                <div
                  className="text-center text-white animate-rise-in opacity-0"
                  style={{ animationDelay: "80ms" }}
                >
                  <h1
                    className="text-4xl font-semibold tracking-tight"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
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

                {/* 편지 이미지 */}
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
                boxShadow: "0px 2px 12px rgba(0,0,0,0.10)",
              }}
              onClick={() => setStep("email")}
            >
              시작하기
            </button>
          </>
        ) : (
          /* 2단계: 이메일 수집 화면 */
          <section className="flex w-full flex-1 flex-col items-center">
            <div
              className="flex flex-col items-center gap-8 animate-rise-in opacity-0"
              style={{ animationDelay: "0ms" }}
            >
              {/* 안내 문구 */}
              <p
                className="text-center text-[20px] font-semibold leading-[1.4] text-[#F3FCFF]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.07)" }}
              >
                편지를 전달할
                <br />
                이메일을 알려주세요
              </p>

              {/* 이메일 입력 + 버튼 */}
              <form
                className="flex w-full max-w-[320px] flex-col items-center gap-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!isEmailValid) return;
                  // TODO: 여기서 다음 단계(편지 작성 화면)로 이동 로직 추가
                  console.log("Email:", email);
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
                  편지 쓰기
                </button>
              </form>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}