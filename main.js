// ============================================================
// WFIT — main.js
// Muscle map interaction + Exercise display (no accounts needed)
// ============================================================

const EXERCISES = {
  chest: [
    { id: 'c1', name: 'Barbell Bench Press',    desc: 'The king of chest exercises. Lie flat, grip shoulder-width, press explosively.',  sets: '4×8',  level: 'intermediate', equipment: 'Barbell'       },
    { id: 'c2', name: 'Incline Dumbbell Press', desc: 'Targets the upper chest. Set bench to 30–45°, press dumbbells upward.',            sets: '3×10', level: 'beginner',     equipment: 'Dumbbells'     },
    { id: 'c3', name: 'Cable Flyes',            desc: 'Excellent for chest isolation. Keep a slight bend in elbows throughout.',           sets: '3×12', level: 'beginner',     equipment: 'Cable'         },
    { id: 'c4', name: 'Push-Ups',               desc: 'Classic bodyweight chest builder. Maintain a straight plank position.',             sets: '4×15', level: 'beginner',     equipment: 'Bodyweight'    },
    { id: 'c5', name: 'Dips (Chest)',           desc: 'Lean forward to shift focus to lower chest. Go deep for full stretch.',             sets: '3×10', level: 'intermediate', equipment: 'Parallel Bars' },
    { id: 'c6', name: 'Decline Bench Press',    desc: 'Emphasises the lower pec. Keep shoulder blades retracted throughout.',              sets: '3×8',  level: 'intermediate', equipment: 'Barbell'       },
  ],
  shoulders: [
    { id: 's1', name: 'Overhead Press', desc: 'Core shoulder builder. Press barbell from chin to full extension overhead.',  sets: '4×6',  level: 'intermediate', equipment: 'Barbell'   },
    { id: 's2', name: 'Lateral Raises', desc: 'Isolates the medial deltoid. Raise arms to shoulder height with control.',    sets: '4×15', level: 'beginner',     equipment: 'Dumbbells' },
    { id: 's3', name: 'Face Pulls',     desc: 'Great for rear delts and rotator cuff health. Pull to forehead level.',       sets: '3×15', level: 'beginner',     equipment: 'Cable'     },
    { id: 's4', name: 'Arnold Press',   desc: 'Rotate palms inward at bottom, outward at top. Full deltoid activation.',     sets: '3×10', level: 'intermediate', equipment: 'Dumbbells' },
    { id: 's5', name: 'Front Raises',   desc: 'Targets the anterior deltoid. Raise one arm at a time for control.',          sets: '3×12', level: 'beginner',     equipment: 'Dumbbells' },
  ],
  abs: [
    { id: 'a1', name: 'Cable Crunch',       desc: 'Weighted ab exercise. Pull cable down while rounding your spine tightly.',    sets: '4×15',  level: 'intermediate', equipment: 'Cable'       },
    { id: 'a2', name: 'Hanging Leg Raises', desc: 'Hang from a bar and raise straight legs to 90°. Control the descent.',        sets: '3×12',  level: 'advanced',     equipment: 'Pull-up Bar' },
    { id: 'a3', name: 'Plank',              desc: 'Isometric core hold. Keep hips level, squeeze glutes and abs hard.',          sets: '3×60s', level: 'beginner',     equipment: 'Bodyweight'  },
    { id: 'a4', name: 'Ab Wheel Rollout',   desc: 'Advanced core exercise. Roll out slowly, brace your core throughout.',        sets: '3×10',  level: 'advanced',     equipment: 'Ab Wheel'    },
    { id: 'a5', name: 'Russian Twists',     desc: 'Targets obliques. Lean back 45°, rotate with a weight side to side.',         sets: '3×20',  level: 'beginner',     equipment: 'Bodyweight'  },
    { id: 'a6', name: 'Bicycle Crunches',   desc: 'Dynamic crunch with rotation. Alternate elbow to opposite knee.',             sets: '3×20',  level: 'beginner',     equipment: 'Bodyweight'  },
  ],
  biceps: [
    { id: 'bi1', name: 'Barbell Curl',          desc: 'The classic mass builder. Keep elbows pinned at your sides throughout.',        sets: '4×10', level: 'beginner',     equipment: 'Barbell'   },
    { id: 'bi2', name: 'Incline Dumbbell Curl', desc: 'Great stretch on the bicep. Sit back on an inclined bench, curl upward.',       sets: '3×12', level: 'intermediate', equipment: 'Dumbbells' },
    { id: 'bi3', name: 'Hammer Curl',           desc: 'Builds both bicep and brachialis. Neutral grip throughout.',                    sets: '3×12', level: 'beginner',     equipment: 'Dumbbells' },
    { id: 'bi4', name: 'Concentration Curl',    desc: 'Peak contraction isolation. Brace upper arm against inner thigh.',              sets: '3×12', level: 'beginner',     equipment: 'Dumbbells' },
    { id: 'bi5', name: 'Cable Curl',            desc: 'Constant tension throughout the movement. Great as a finisher.',                sets: '3×15', level: 'beginner',     equipment: 'Cable'     },
  ],
  triceps: [
    { id: 'tri1', name: 'Close-Grip Bench Press',    desc: 'Heavy tricep compound. Grip 1–2 fists apart, flare elbows slightly out.',  sets: '4×8',  level: 'intermediate', equipment: 'Barbell'        },
    { id: 'tri2', name: 'Overhead Tricep Extension', desc: 'Long head isolation. Keep upper arms vertical, lower bar behind head.',    sets: '3×12', level: 'beginner',     equipment: 'Dumbbell'       },
    { id: 'tri3', name: 'Tricep Pushdown',           desc: 'Cable isolation. Keep elbows locked at sides, push bar straight down.',    sets: '3×15', level: 'beginner',     equipment: 'Cable'          },
    { id: 'tri4', name: 'Skull Crushers',            desc: 'Classic tricep builder. Lower the bar toward your forehead with control.', sets: '3×10', level: 'intermediate', equipment: 'Barbell/EZ Bar' },
    { id: 'tri5', name: 'Dips (Tricep)',             desc: 'Stay upright to target triceps. Lock out fully at top.',                   sets: '4×12', level: 'intermediate', equipment: 'Parallel Bars'  },
  ],
  forearms: [
    { id: 'fo1', name: 'Wrist Curls',         desc: 'Targets the forearm flexors. Sit on a bench, roll the bar with your wrists.', sets: '3×15',  level: 'beginner',     equipment: 'Barbell'    },
    { id: 'fo2', name: 'Reverse Wrist Curls', desc: 'Works the extensors. Perform wrist curls with an overhand grip.',              sets: '3×15',  level: 'beginner',     equipment: 'Barbell'    },
    { id: 'fo3', name: 'Farmers Walk',        desc: 'Brutal forearm builder. Carry heavy dumbbells as far as possible.',            sets: '3×30m', level: 'intermediate', equipment: 'Dumbbells'  },
    { id: 'fo4', name: 'Dead Hangs',          desc: 'Grip strength endurance. Hang from a bar as long as possible.',               sets: '3×max', level: 'beginner',     equipment: 'Pull-up Bar'},
  ],
  back: [
    { id: 'bk1', name: 'Deadlift',         desc: 'The ultimate back movement. Keep back flat, drive hips through.',            sets: '4×5',  level: 'advanced',     equipment: 'Barbell'     },
    { id: 'bk2', name: 'Pull-Ups',         desc: 'Best lat exercise. Pull chest to bar, grip wider than shoulders.',           sets: '4×8',  level: 'intermediate', equipment: 'Pull-up Bar' },
    { id: 'bk3', name: 'Barbell Row',      desc: 'Thick back builder. Hinge to 45°, row bar to lower chest.',                  sets: '4×8',  level: 'intermediate', equipment: 'Barbell'     },
    { id: 'bk4', name: 'Lat Pulldown',     desc: 'Great lat isolation. Pull bar to upper chest, lean back slightly.',          sets: '3×12', level: 'beginner',     equipment: 'Cable'       },
    { id: 'bk5', name: 'Seated Cable Row', desc: 'Mid-back thickness. Pull to navel, keep chest up and elbows close.',         sets: '3×12', level: 'beginner',     equipment: 'Cable'       },
    { id: 'bk6', name: 'T-Bar Row',        desc: 'Excellent for mid-back depth. Use a V-handle for better stretch.',           sets: '3×10', level: 'intermediate', equipment: 'Machine'     },
  ],
  legs: [
    { id: 'l1', name: 'Barbell Squat',         desc: 'The king of leg exercises. Bar on upper traps, squat deep.',                  sets: '4×6',  level: 'advanced',     equipment: 'Barbell'   },
    { id: 'l2', name: 'Romanian Deadlift',     desc: 'Hamstring hip hinge. Keep bar close to legs, feel the stretch.',              sets: '4×10', level: 'intermediate', equipment: 'Barbell'   },
    { id: 'l3', name: 'Leg Press',             desc: 'High volume leg builder. Vary foot placement for different areas.',            sets: '4×12', level: 'beginner',     equipment: 'Machine'   },
    { id: 'l4', name: 'Bulgarian Split Squat', desc: 'Unilateral quad destroyer. Rear foot elevated, deep front lunge.',            sets: '3×10', level: 'advanced',     equipment: 'Dumbbells' },
    { id: 'l5', name: 'Leg Curl',              desc: 'Isolates the hamstrings. Curl with control, squeeze at peak contraction.',    sets: '3×12', level: 'beginner',     equipment: 'Machine'   },
    { id: 'l6', name: 'Standing Calf Raise',   desc: 'Full range of motion. Stretch at bottom, squeeze hard at top.',               sets: '4×20', level: 'beginner',     equipment: 'Machine'   },
  ],
};

const MUSCLE_LABELS = {
  chest: 'Chest', shoulders: 'Shoulders', abs: 'Abs',
  biceps: 'Biceps', triceps: 'Triceps', forearms: 'Forearms',
  back: 'Back', legs: 'Legs',
};

// ── DOM refs ──────────────────────────────────────────────
const muscles      = document.querySelectorAll('.muscle');
const legendItems  = document.querySelectorAll('#legend-list li');
const infoPanel    = document.getElementById('info-panel');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose   = document.getElementById('modal-close');
const modalTitle   = document.getElementById('modal-title');
const modalCount   = document.getElementById('modal-count');
const modalBody    = document.getElementById('modal-body');

let activeMuscle = null;

// ── Render exercise card ──────────────────────────────────
function exerciseCard(ex) {
  return `
    <div class="exercise-item">
      <h4>${ex.name}</h4>
      <p>${ex.desc}</p>
      <div class="exercise-meta">
        <span class="tag">${ex.sets}</span>
        <span class="tag level-${ex.level}">${ex.level}</span>
        <span class="tag">${ex.equipment}</span>
      </div>
    </div>`;
}

// ── Render sidebar panel ──────────────────────────────────
function renderInfoPanel(muscleKey) {
  const exs = EXERCISES[muscleKey] || [];
  infoPanel.innerHTML = `
    <div class="info-panel-header">
      <h3>${MUSCLE_LABELS[muscleKey]}</h3>
      <span class="count">${exs.length} exercises</span>
    </div>
    <div class="exercise-list">
      ${exs.map(exerciseCard).join('')}
    </div>`;
}

// ── Open modal (mobile) ───────────────────────────────────
function openModal(muscleKey) {
  const exs = EXERCISES[muscleKey] || [];
  modalTitle.textContent = MUSCLE_LABELS[muscleKey] + ' Exercises';
  modalCount.textContent = exs.length + ' exercises';
  modalBody.innerHTML    = exs.map(exerciseCard).join('');
  modalOverlay.classList.add('open');
}

// ── Select muscle ─────────────────────────────────────────
function selectMuscle(muscleKey) {
  activeMuscle = muscleKey;
  muscles.forEach(m => m.classList.toggle('active', m.dataset.muscle === muscleKey));
  legendItems.forEach(li => li.classList.toggle('active', li.dataset.muscle === muscleKey));
  renderInfoPanel(muscleKey);
  if (window.innerWidth < 900) openModal(muscleKey);
}

// ── Events ────────────────────────────────────────────────
muscles.forEach(m => m.addEventListener('click', () => selectMuscle(m.dataset.muscle)));
legendItems.forEach(li => li.addEventListener('click', () => selectMuscle(li.dataset.muscle)));

modalClose.addEventListener('click', () => modalOverlay.classList.remove('open'));
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) modalOverlay.classList.remove('open'); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') modalOverlay.classList.remove('open'); });
