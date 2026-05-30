export type HowTo = {
  slug: string;
  title: string;
  excerpt: string;
  difficulty: "Easy" | "Medium" | "Hard";
  time: string;
  tools: string[];
  heroImage: string;
  steps: { title: string; body: string }[];
  warning?: string;
  cta: string;
};

export const howtos: HowTo[] = [
  {
    slug: "how-to-check-your-oil",
    title: "How to Check Your Oil Level",
    excerpt:
      "Checking your oil takes about two minutes and can save you from a very expensive engine repair. Here's how to do it right every time.",
    difficulty: "Easy",
    time: "5 minutes",
    tools: [
      "Clean rag or paper towel",
      "Your vehicle's owner's manual (optional)",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80&auto=format&fit=crop",
    steps: [
      {
        title: "Park on a level surface and let the engine cool",
        body: "Pull onto flat ground and turn the engine off. Wait at least 5–10 minutes before checking — hot oil can burn you, and it also needs a moment to drain back into the pan so you get an accurate reading.",
      },
      {
        title: "Pop the hood and locate the dipstick",
        body: "Look for a brightly colored handle — usually yellow or orange — sticking up from the engine. It's almost always labeled 'Engine Oil.' If you're not sure, a quick look in your owner's manual will point you right to it.",
      },
      {
        title: "Pull out the dipstick and wipe it clean",
        body: "Pull the dipstick all the way out and wipe it completely clean with your rag or paper towel. This step matters — the initial reading can be misleading since oil sloshes around when you're driving.",
      },
      {
        title: "Reinsert the dipstick fully, then pull it out again",
        body: "Push the dipstick all the way back in until it seats, then pull it straight out again. Hold it horizontally so the oil doesn't run up or down the stick.",
      },
      {
        title: "Read the oil level",
        body: "Look at the tip of the dipstick. There are two marks — a MIN and a MAX (sometimes shown as dots, lines, or a crosshatched zone). The oil film on the stick should be somewhere between those two marks. Right in the middle or closer to MAX is ideal.",
      },
      {
        title: "Check the oil color while you're at it",
        body: "Fresh oil is amber-colored. Dark brown or black oil is old and ready for a change. If the oil looks milky or foamy, that can mean coolant is mixing in — that's a sign to get to a shop right away.",
      },
      {
        title: "Top off if needed, then reinsert the dipstick",
        body: "If the level is low, add a small amount of the correct oil type (check your owner's manual) through the oil filler cap on top of the engine. Add a little at a time and re-check. Don't overfill. When you're done, make sure the dipstick is pushed all the way back in.",
      },
    ],
    cta: "If your oil is consistently low, looks milky, or you're just due for a change, bring it by Junior's Auto Repair at 417 Main Ave E, Twin Falls. We're open Mon–Sat 9–5 and you can reach us at (208) 595-2101. We're happy to take a look.",
  },
  {
    slug: "how-to-check-tire-pressure",
    title: "How to Check and Inflate Your Tires",
    excerpt:
      "Properly inflated tires make your car handle better, last longer, and get better gas mileage. Takes less than ten minutes and all you need is a simple gauge.",
    difficulty: "Easy",
    time: "10 minutes",
    tools: [
      "Tire pressure gauge (pencil, dial, or digital — any will do)",
      "Air compressor or access to a gas station air pump",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1571335746824-742511d49bce?w=800&q=80&auto=format&fit=crop",
    steps: [
      {
        title: "Find your recommended tire pressure",
        body: "Don't use the number printed on the tire sidewall — that's the maximum pressure the tire can hold, not what you want to drive on. Instead, check the sticker on the inside of your driver's door jamb, or look in your owner's manual. It'll usually be somewhere between 30 and 36 PSI.",
      },
      {
        title: "Check tires when they're cold",
        body: "Tire pressure readings are most accurate when the tires are cold — meaning the car has been sitting for at least a few hours. Driving heats the air inside and raises the pressure, which can make things look fine when they're actually low.",
      },
      {
        title: "Remove the valve cap from the first tire",
        body: "Look for the small rubber or metal cap sticking out from the inner rim of the wheel. Twist it off counterclockwise and set it somewhere you won't lose it — a pocket works great.",
      },
      {
        title: "Press your gauge firmly onto the valve stem",
        body: "Push the gauge straight on — you want a solid seal so air doesn't leak out. If you hear a hiss, adjust your angle. Your gauge will give you a reading in seconds.",
      },
      {
        title: "Compare to your target pressure and add air if needed",
        body: "If the reading is below your target, attach your air hose to the valve stem and add air in short bursts, checking frequently. It's easy to overshoot. If you accidentally over-inflate, use the small pin in the center of the valve stem (or the back of some gauges) to release a little air.",
      },
      {
        title: "Repeat on all four tires — and don't forget the spare",
        body: "Work your way around the car. Tires can lose pressure at different rates, so each one needs its own check. Check your spare too — a flat spare is useless when you need it most.",
      },
      {
        title: "Replace all valve caps",
        body: "Valve caps keep dirt and moisture out of the valve stem. Don't skip this — it's a small thing that prevents future headaches.",
      },
    ],
    cta: "If a tire keeps losing pressure, has a nail in it, or you notice uneven wear across your tires, stop by Junior's Auto Repair at 417 Main Ave E, Twin Falls. We're open Mon–Sat 9–5 and you can call us at (208) 595-2101. We'll get you sorted out.",
  },
  {
    slug: "how-to-jump-start-a-car",
    title: "How to Jump Start a Dead Battery",
    excerpt:
      "A dead battery doesn't have to ruin your day. With a set of jumper cables and another running vehicle, you can usually get back on the road in under ten minutes.",
    difficulty: "Medium",
    time: "15 minutes",
    tools: [
      "Jumper cables (at least 10 feet long, 6-gauge or thicker)",
      "A running vehicle with a healthy battery",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1592318348310-f31b61a931c8?w=800&q=80&auto=format&fit=crop",
    warning:
      "Never jump-start a cracked, leaking, or frozen battery — it can explode. Some modern vehicles have special jump-start terminals under the hood rather than directly on the battery. Check your owner's manual if you're unsure.",
    steps: [
      {
        title: "Position the vehicles and turn both engines off",
        body: "Pull the working vehicle close enough for your cables to reach both batteries comfortably — usually nose to nose or side by side. Turn both vehicles completely off. Make sure they're not touching each other.",
      },
      {
        title: "Identify the positive and negative terminals",
        body: "On each battery, find the positive terminal (marked with a '+' and usually has a red cover) and the negative terminal (marked with a '-', usually black). Your jumper cables are also color-coded: red for positive, black for negative.",
      },
      {
        title: "Connect the red cable to the dead battery's positive terminal",
        body: "Clamp one end of the red cable firmly to the positive terminal of the dead battery. Make sure you have a solid connection — a weak grip can cause sparking.",
      },
      {
        title: "Connect the other red cable end to the good battery's positive terminal",
        body: "Take the other red clamp and connect it to the positive terminal of the working vehicle's battery. Again, make it a firm connection.",
      },
      {
        title: "Connect the black cable to the good battery's negative terminal",
        body: "Now switch to the black cable. Clamp one end to the negative terminal of the good battery.",
      },
      {
        title: "Clamp the last black cable to an unpainted metal ground on the dead car",
        body: "This is the most important step people get wrong. Do NOT connect the final black clamp to the dead battery's negative terminal. Instead, attach it to an unpainted metal part of the dead car's engine — a bolt on the engine block or a metal bracket works well. This prevents sparks near the battery.",
      },
      {
        title: "Start the working car, wait a few minutes, then start the dead one",
        body: "Let the working car run for 2–3 minutes. Then try to start the dead vehicle. If it starts, let it run for at least 15–20 minutes (or take a short drive) to let the alternator recharge the battery. Remove the cables in the reverse order you connected them: black from ground, black from good battery, red from good battery, red from formerly dead battery.",
      },
    ],
    cta: "If your battery keeps dying, or your car won't start even after a jump, bring it to Junior's Auto Repair at 417 Main Ave E, Twin Falls. We're open Mon–Sat 9–5 — give us a call at (208) 595-2101 and we'll figure out what's going on.",
  },
  {
    slug: "how-to-change-a-flat-tire",
    title: "How to Change a Flat Tire Safely",
    excerpt:
      "Getting a flat is stressful, but changing it yourself is a skill worth knowing. Here's how to do it safely and get back on the road.",
    difficulty: "Medium",
    time: "30–45 minutes",
    tools: [
      "Spare tire (make sure it's properly inflated)",
      "Car jack (usually stored with the spare)",
      "Lug wrench (usually stored with the spare)",
      "Vehicle owner's manual",
      "Wheel wedges or rocks (optional but helpful)",
      "Flashlight (if working at night)",
      "Reflective triangles or flares (optional)",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=800&q=80&auto=format&fit=crop",
    warning:
      "Never change a tire on a highway lane or on a steep slope if you can avoid it. If it's not safe to pull completely off the road, stay in your car with your seatbelt on and call for roadside assistance.",
    steps: [
      {
        title: "Get safely off the road and turn on your hazard lights",
        body: "As soon as you realize you have a flat, slow down gradually and steer to a flat, stable surface away from traffic — a parking lot or wide shoulder is ideal. Turn on your hazard lights immediately. If you have reflective triangles, set them out behind the car.",
      },
      {
        title: "Apply the parking brake and loosen the lug nuts slightly",
        body: "Put the car in park and engage the parking brake. Before you lift the car with the jack, use your lug wrench to break the lug nuts loose — just one half-turn each, counterclockwise. It's much harder to loosen them once the wheel is off the ground.",
      },
      {
        title: "Position the jack under the correct jack point",
        body: "Your owner's manual will show you exactly where to place the jack — there are reinforced points on the vehicle's frame designed for this. Using the wrong spot can damage your car. Slide the jack into position on solid, level ground.",
      },
      {
        title: "Raise the vehicle until the flat tire is off the ground",
        body: "Slowly raise the jack until the flat tire is about six inches off the ground. Never get under a car that's only supported by a jack. Keep people and pets clear while the car is raised.",
      },
      {
        title: "Remove the lug nuts and take off the flat tire",
        body: "Finish removing the lug nuts all the way and set them somewhere safe — a pocket or cupped in your hand. Pull the flat tire straight toward you and set it flat on the ground.",
      },
      {
        title: "Mount the spare and hand-tighten the lug nuts in a star pattern",
        body: "Lift the spare onto the bolts and push it all the way in. Thread the lug nuts on by hand, then snug them up with the wrench in a star pattern (not a circle) — this keeps the wheel sitting evenly.",
      },
      {
        title: "Lower the car and fully tighten the lug nuts",
        body: "Lower the jack until the tire touches the ground, then use your full body weight on the lug wrench to tighten each nut firmly — again in a star pattern. Stow your flat, jack, and tools. If you're on a compact spare ('donut'), keep your speed under 50 mph and don't drive on it for more than 50–70 miles.",
      },
    ],
    cta: "A spare tire is a temporary fix, not a permanent one. Bring your flat in to Junior's Auto Repair at 417 Main Ave E, Twin Falls — we'll see if it can be repaired or if you need a replacement. Call us at (208) 595-2101, Mon–Sat 9–5.",
  },
  {
    slug: "how-to-check-brake-fluid",
    title: "How to Check Your Brake Fluid",
    excerpt:
      "Brake fluid is easy to overlook, but it's what gives your brake pedal its firmness. Low or dark fluid is a sign your brakes need attention.",
    difficulty: "Easy",
    time: "5 minutes",
    tools: ["Clean rag", "Flashlight (helpful but optional)"],
    heroImage:
      "https://images.unsplash.com/photo-1613214150384-14921ff659b2?w=800&q=80&auto=format&fit=crop",
    warning:
      "Brake fluid is corrosive — keep it off your paint and wash it off your skin right away if you get any on you. If your brake pedal feels soft or spongy, don't just top off the fluid and call it done. That can be a sign of a serious problem like air in the lines or a leak. Get it checked by a professional.",
    steps: [
      {
        title: "Make sure the engine is off and the car is on level ground",
        body: "You don't need to let the engine cool for this one — you're not opening anything hot. Just make sure you're parked on a flat surface so the fluid level reads accurately.",
      },
      {
        title: "Pop the hood and find the brake fluid reservoir",
        body: "Look toward the back of the engine compartment on the driver's side. The reservoir is a small, semi-transparent plastic container sitting on top of the brake master cylinder. It'll have a cap labeled 'Brake Fluid' with a warning symbol.",
      },
      {
        title: "Check the level through the reservoir without opening it",
        body: "Because the reservoir is translucent, you can usually read the level without removing the cap. Look for MIN and MAX lines on the side. The fluid should be between those lines. If it's at or below MIN, it needs a top-off.",
      },
      {
        title: "Check the color of the fluid",
        body: "Fresh brake fluid is light yellow and fairly clear. Over time it darkens to amber, then brown, then nearly black. Dark fluid is old and moisture-laden, which can hurt your brake system's components. Most manufacturers recommend flushing it every 2–3 years.",
      },
      {
        title: "Top off only if needed — use the right type",
        body: "If you need to add fluid, clean around the cap before opening it (dirt in brake fluid is bad news). Your vehicle likely takes DOT 3 or DOT 4 — check your owner's manual or the cap itself. Add slowly and stop at the MAX line. Never overfill.",
      },
    ],
    cta: "If your brake fluid is very dark, consistently low, or your pedal doesn't feel right, please don't wait on that. Come see us at Junior's Auto Repair, 417 Main Ave E, Twin Falls. We're open Mon–Sat 9–5 and reachable at (208) 595-2101.",
  },
  {
    slug: "how-to-clean-battery-terminals",
    title: "How to Clean Corroded Battery Terminals",
    excerpt:
      "That blue-white fuzzy buildup on your battery terminals is corrosion, and it can cause all kinds of electrical gremlins. The good news — it's easy to clean off.",
    difficulty: "Easy",
    time: "20 minutes",
    tools: [
      "Baking soda",
      "Water",
      "Old toothbrush or wire brush",
      "Wrench or pliers (to disconnect terminals)",
      "Rags or paper towels",
      "Rubber gloves",
      "Petroleum jelly or terminal protector spray",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?w=800&q=80&auto=format&fit=crop",
    warning:
      "Always disconnect the negative (black) terminal first and reconnect it last. This prevents accidental shorts. Wear gloves and avoid touching your eyes — battery corrosion contains sulfuric acid residue.",
    steps: [
      {
        title: "Turn off the engine and put on your gloves",
        body: "Safety first. Make sure the car is completely off, keys out of the ignition. Gloves protect your hands from the corrosive material on the terminals.",
      },
      {
        title: "Disconnect the negative terminal, then the positive",
        body: "Use your wrench to loosen the clamp on the negative terminal (the one with the '-' or black color) and wiggle it free. Then do the same with the positive. Keep them from touching each other or the car frame.",
      },
      {
        title: "Mix your cleaning solution and apply it",
        body: "Mix one tablespoon of baking soda with one cup of water. Pour a small amount directly over the corroded terminals and clamps. You'll see it fizz — that's the baking soda neutralizing the acid. Let it sit for a minute or two.",
      },
      {
        title: "Scrub with your brush",
        body: "Use your old toothbrush or wire brush to scrub the terminals, the cable clamps, and any corroded areas on the battery posts. Work the fizzy mixture into all the nooks. Rinse with a little clean water and wipe dry with a rag.",
      },
      {
        title: "Inspect the cables while you're in there",
        body: "Take a look at the battery cables themselves. If the insulation is cracked, frayed, or the wire inside looks corroded beyond the clamp, the cable may need replacing. Worth noting before you put everything back together.",
      },
      {
        title: "Reconnect the terminals and apply protector",
        body: "Reconnect the positive terminal first, then the negative — the reverse of how you disconnected them. Tighten both snugly. Then apply a thin layer of petroleum jelly or a shot of terminal protector spray to help slow future corrosion.",
      },
    ],
    cta: "If your battery is more than 3–4 years old, or if the corrosion comes back quickly, it might be time for a new one. Swing by Junior's Auto Repair at 417 Main Ave E, Twin Falls — we can test your battery on the spot. Mon–Sat 9–5, or call (208) 595-2101.",
  },
  {
    slug: "how-to-replace-wiper-blades",
    title: "How to Replace Your Windshield Wiper Blades",
    excerpt:
      "Streaky, squeaky wipers are more than annoying — they're a visibility hazard. Replacing them takes about ten minutes and no tools at all.",
    difficulty: "Easy",
    time: "10–15 minutes",
    tools: [
      "New wiper blades (bring your vehicle year, make, and model to the auto parts store — driver and passenger blades are often different lengths)",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1596986952526-3be237187071?w=800&q=80&auto=format&fit=crop",
    steps: [
      {
        title: "Buy the right blades for your vehicle",
        body: "Stop by any auto parts store and tell them your year, make, and model. They'll look up the correct blade size for both the driver and passenger sides — they're frequently different lengths. Many stores will even install them for free, but it's just as easy to do yourself.",
      },
      {
        title: "Lift the wiper arm away from the windshield",
        body: "Gently pull the wiper arm up and away from the glass until it locks in a raised position. Be careful — if it snaps back without a blade attached, it can crack your windshield. Lift one arm at a time.",
      },
      {
        title: "Find and press the release tab on the blade",
        body: "Where the blade meets the arm, look for a small plastic tab or button on the underside of the connector. Press or squeeze it — this releases the blade from the hook on the wiper arm.",
      },
      {
        title: "Slide or pivot the old blade off",
        body: "With the tab pressed, pivot or slide the blade down and off the arm hook. Note how it was attached before you fully remove it — it'll make installing the new one a lot easier.",
      },
      {
        title: "Attach the new blade",
        body: "Line up the hook on the wiper arm with the connector on the new blade. Push it upward until you hear or feel a distinct click. Give it a gentle tug to confirm it's locked in place.",
      },
      {
        title: "Lower the arm back to the windshield and repeat on the other side",
        body: "Gently lower the arm back down onto the glass — don't let it drop. Repeat the process for the passenger side. Some vehicles also have a rear wiper; check if yours needs replacing too.",
      },
      {
        title: "Test them before you drive",
        body: "Turn your wipers on with a little washer fluid. Watch for streaking, skipping, or squeaking. A smooth, clean wipe means you're good to go.",
      },
    ],
    cta: "If your wipers seem fine but you still can't see well in the rain, the issue might be your windshield itself. Come by Junior's Auto Repair at 417 Main Ave E, Twin Falls — we're open Mon–Sat 9–5 and you can call us at (208) 595-2101.",
  },
  {
    slug: "how-to-add-coolant",
    title: "How to Add Coolant to Your Radiator",
    excerpt:
      "Coolant (also called antifreeze) keeps your engine from overheating in the summer and freezing solid in a Twin Falls winter. Here's how to safely top it off.",
    difficulty: "Easy",
    time: "10 minutes",
    tools: [
      "Pre-mixed coolant (or concentrated coolant plus distilled water for a 50/50 mix)",
      "Funnel (optional but helpful)",
      "Rags",
      "Rubber gloves",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1726867544292-fefe36817fff?w=800&q=80&auto=format&fit=crop",
    warning:
      "NEVER open the radiator cap or the coolant reservoir cap when the engine is hot. The system is pressurized, and hot coolant can spray out and cause serious burns. Wait at least 30–60 minutes after driving before touching anything.",
    steps: [
      {
        title: "Let the engine cool completely",
        body: "This cannot be overstated. If the engine has been running recently, walk away and come back in at least 30–60 minutes. The coolant system runs under pressure, and opening it hot is genuinely dangerous.",
      },
      {
        title: "Open the hood and find the coolant reservoir",
        body: "Look for a semi-transparent plastic tank — usually white or light gray — connected to the radiator by a hose. It'll have MIN and MAX markings on the side and a cap that often says 'Coolant' or has a thermometer symbol. This reservoir is where you add coolant in most modern vehicles.",
      },
      {
        title: "Check the current level",
        body: "Look at the MIN and MAX lines on the outside of the reservoir. The coolant level should fall between them. If it's below the MIN line, it needs a top-off.",
      },
      {
        title: "Check what type of coolant your car needs",
        body: "Coolant comes in different formulas — green, orange, pink, and others — and they should not be mixed. Look in your owner's manual or on the reservoir cap itself for the correct type. Using the wrong coolant can damage your cooling system over time.",
      },
      {
        title: "Add coolant slowly to the reservoir",
        body: "Unscrew the reservoir cap slowly (even when cold, do it gently). Pour the correct coolant in gradually, stopping to check the level frequently. Fill to the MAX line — not above it.",
      },
      {
        title: "Replace the cap and check for leaks",
        body: "Screw the cap back on firmly. Start the engine and let it warm up to normal operating temperature. Watch the temperature gauge — it should stay in the normal range. After the car cools down, check the reservoir level one more time to confirm.",
      },
    ],
    cta: "If your coolant level keeps dropping, there may be a leak somewhere in the system — and that's not something to ignore. Come see us at Junior's Auto Repair, 417 Main Ave E, Twin Falls. We're open Mon–Sat 9–5. Give us a call at (208) 595-2101 and we'll take a look.",
  },
];
