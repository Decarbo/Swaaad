import React from "react";

export default function Hero() {
	return (
		<div className="overflow-hidden pb-14">
			<div className="relative mx-auto flex h-[28em] w-full max-w-[1880px] items-center justify-center rounded-t-3xl bg-white md:h-[40em] overflow-visible">
				<div className="absolute left-0 top-[32px] h-auto w-[70%] translate-x-[-70%]">
					<img
						loading="lazy"
						src="https://b.zmtcdn.com/data/o2_assets/901001826baf04838b1bf505176ff0b11742453501.png"
						alt="left background"
						className="h-auto w-full"
					/>
				</div>
				<div className="absolute right-0 top-[-20%] h-auto w-[70%] translate-x-[65%]">
					<img
						loading="lazy"
						src="https://b.zmtcdn.com/data/o2_assets/901001826baf04838b1bf505176ff0b11742453501.png"
						alt="right background"
						className="h-auto w-full"
					/>
				</div>

				<div className="absolute top-[142px] flex flex-col items-center gap-6 2xl:gap-8 justify-center md:top-[240px]">
					<div className="w-5/12 whitespace-pre-line text-center font-semibold text-zRed500 md:w-5/12 lg:w-8/12 text-heading">
						Better food for more people
					</div>
					<div className="w-5/12 text-center font-light text-comet md:w-5/12 text-subtitle">
						For over a decade, we’ve enabled our customers to discover new tastes, delivered right to their doorstep
					</div>
				</div>

				<img
					src="https://b.zmtcdn.com/data/o2_assets/110a09a9d81f0e5305041c1b507d0f391743058910.png"
					alt="hero floating"
					className="absolute top-[40%] w-[130px] md:w-[min(22%,240px)] rounded-lg left-[8%] xl:left-[15%]"
				/>
				<img
					src="https://b.zmtcdn.com/data/o2_assets/b4f62434088b0ddfa9b370991f58ca601743060218.png"
					alt="hero floating"
					className="absolute right-[10%] top-[15%] z-30 aspect-[420/370] w-[120px] md:w-[min(24%,240px)] rounded-lg xl:right-[15%] xl:top-8"
				/>
				<img
					src="https://b.zmtcdn.com/data/o2_assets/316495f4ba2a9c9d9aa97fed9fe61cf71743059024.png"
					alt="hero floating"
					className="absolute right-[12%] bottom-[10%] xl:bottom-10 xl:right-[10%] aspect-square w-[124px] md:w-[min(24%,240px)] rounded-lg"
				/>
				<img
					src="https://b.zmtcdn.com/data/o2_assets/70b50e1a48a82437bfa2bed925b862701742892555.png"
					alt="decorative icon"
					className="absolute top-[10%] left-[30%] w-8 xl:w-12 aspect-[92/67] rotate-2"
				/>
				<img
					src="https://b.zmtcdn.com/data/o2_assets/9ef1cc6ecf1d92798507ffad71e9492d1742892584.png"
					alt="decorative icon"
					className="absolute right-[12%] xl:right-[8%] xl:bottom-[55%] w-8 xl:w-12 aspect-[158/125] rotate-45"
				/>
				<img
					src="https://b.zmtcdn.com/data/o2_assets/9ef1cc6ecf1d92798507ffad71e9492d1742892584.png"
					alt="decorative icon"
					className="absolute bottom-[10%] left-[20%] xl:bottom-[2%] xl:left-[10%] w-8 xl:w-12 aspect-[158/125] -rotate-2"
				/>
			</div>

			<div className="z-50 bg-white mx-auto flex w-fit max-w-screen-lg items-center justify-center gap-8 rounded-2xl border-[0.64px] border-zRed100 px-4 py-3 shadow-[0px_2.777px_13.401px_0px_rgba(0,0,0,0.09)] lg:rounded-[32px] lg:px-7 lg:py-6 2xl:gap-12 2xl:mt-14">
				<div className="flex items-center">
					<div>
						<div className="text-2xl font-bold text-comet lg:text-3xl 2xl:text-4xl">3,00,000+</div>
						<div className="text-slateGrey md:text-base lg:text-lg">restaurants</div>
					</div>
					<img
						src="https://b.zmtcdn.com/data/o2_assets/d19ec60986487a77bcb026e5efc3325f1742908200.png"
						alt="restaurant icon"
						className="ml-4 max-h-10 lg:max-h-14 2xl:ml-8"
					/>
				</div>

				<div className="h-9 lg:h-12 xl:h-16 w-1 border-l border-lavenderMist"></div>

				<div className="flex items-center">
					<div>
						<div className="text-2xl font-bold text-comet lg:text-3xl 2xl:text-4xl">800+</div>
						<div className="text-slateGrey md:text-base lg:text-lg">cities</div>
					</div>
					<img
						src="https://b.zmtcdn.com/data/o2_assets/e7533c4081d6140da37b9f430cb7b8051743006192.png"
						alt="city icon"
						className="ml-4 max-h-10 lg:max-h-14 2xl:ml-8"
					/>
				</div>

				<div className="h-9 lg:h-12 xl:h-16 w-1 border-l border-lavenderMist"></div>

				<div className="flex items-center">
					<div>
						<div className="text-2xl font-bold text-comet lg:text-3xl 2xl:text-4xl">3 billion+</div>
						<div className="text-slateGrey md:text-base lg:text-lg">orders delivered</div>
					</div>
					<img
						src="https://b.zmtcdn.com/data/o2_assets/713443cc5944ce4284d7e49e75e2aacf1742466222.png"
						alt="order icon"
						className="ml-4 max-h-10 lg:max-h-14 2xl:ml-8"
					/>
				</div>
			</div>
		</div>
	);
}
