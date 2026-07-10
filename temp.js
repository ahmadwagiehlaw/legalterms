



        // Initialize Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyB8FpmdmHMmoZkCJqpefr7POHFInSHAmlk",
            authDomain: "legalterms-e66ad.firebaseapp.com",
            projectId: "legalterms-e66ad",
            storageBucket: "legalterms-e66ad.firebasestorage.app",
            messagingSenderId: "560103968057",
            appId: "1:560103968057:web:2a0696a84dc0d2768bace8"
        };
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        const APP_VERSION = "1.0.2";

        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        academy: {
                            50: '#fcfaf2',
                            100: '#f5edd2',
                            500: '#d4af37', // Academic Gold
                            600: '#bfa030',
                            800: '#111827',
                            900: '#070a13', // Deep Black Blue
                            950: '#03050a'
                        }
                    },
                    fontFamily: {
                        sans: ['Cairo', 'sans-serif'],
                        serif: ['Playfair Display', 'serif']
                    }
                }
            }
        }
    

        // MASTER DATABASE: Preloading and matching exact image content terms
        let glossaryData = [
            // Exams & images critical terms
            { id: 1, arabic: "قواعد مجردة", english: "Abstract rules", type: "word", page: "19", category: "قواعد ومبادئ", ignored: false },
            { id: 2, arabic: "هيئة النيابة الإدارية", english: "Administrative Prosecution Authority", type: "word", page: "19", category: "جهات قضائية", ignored: false },
            { id: 3, arabic: "مشروع القانون", english: "Bill", type: "word", page: "19", category: "تشريعات", ignored: false },
            { id: 4, arabic: "قواعد مكملة", english: "Supplementary rules", type: "word", page: "20", category: "قواعد ومبادئ", ignored: false },
            { id: 5, arabic: "العرف", english: "Custom", type: "word", page: "20", category: "تشريعات", ignored: false },
            { id: 6, arabic: "عقوبة إدارية", english: "Administrative penalty", type: "word", page: "19", category: "جزاءات", ignored: false },
            { id: 7, arabic: "سلطة", english: "Authority", type: "word", page: "20", category: "سلطات عامة", ignored: false },
            { id: 8, arabic: "المواطن", english: "Citizen", type: "word", page: "20", category: "عام", ignored: false },
            { id: 9, arabic: "حالة الطوارئ", english: "State of emergency", type: "word", page: "22", category: "سلطات عامة", ignored: false },
            { id: 10, arabic: "انتخابات", english: "Elections", type: "word", page: "21", category: "عام", ignored: false },
            
            // Standard Book Glossary terms
            { id: 11, arabic: "تصرف / فعل / قانون", english: "Act", type: "word", page: "19", category: "تصرفات قانونية", ignored: false },
            { id: 12, arabic: "المحاكم الإدارية", english: "Administrative courts", type: "word", page: "19", category: "جهات قضائية", ignored: false },
            { id: 13, arabic: "مجلس الوزراء", english: "Council of Ministers", type: "word", page: "20", category: "سلطات عامة", ignored: false },
            { id: 14, arabic: "السلطة التنفيذية", english: "Executive authority", type: "word", page: "20", category: "سلطات عامة", ignored: false },
            { id: 15, arabic: "قواعد آمرة", english: "Imperative rules", type: "word", page: "20", category: "قواعد ومبادئ", ignored: false },
            { id: 16, arabic: "العدالة", english: "Justice / Equity", type: "word", page: "20", category: "قواعد ومبادئ", ignored: false },
            { id: 17, arabic: "قواعد قانونية", english: "Legal rules", type: "word", page: "21", category: "قواعد ومبادئ", ignored: false },
            { id: 18, arabic: "المشرع", english: "Legislator", type: "word", page: "21", category: "تشريعات", ignored: false },
            { id: 19, arabic: "البرلمان (مجلس النواب)", english: "Parliament", type: "word", page: "22", category: "سلطات عامة", ignored: false },
            { id: 20, arabic: "رئيس الجمهورية", english: "President of the republic", type: "word", page: "22", category: "سلطات عامة", ignored: false },
            { id: 21, arabic: "النيابة العامة", english: "Public Prosecution", type: "word", page: "22", category: "جهات قضائية", ignored: false },
            { id: 22, arabic: "هيئة قضايا الدولة", english: "State Lawsuit Authority", type: "word", page: "23", category: "جهات قضائية", ignored: false },
            { id: 23, arabic: "مجلس الدولة", english: "State Council", type: "word", page: "23", category: "جهات قضائية", ignored: false },
            { id: 24, arabic: "قانون", english: "Law", type: "word", page: "3", category: "قواعد ومبادئ", ignored: false },
            { id: 25, arabic: "عقد", english: "Contract", type: "word", page: "16", category: "تصرفات قانونية", ignored: false },
            { id: 26, arabic: "إيجاب", english: "Offer", type: "word", page: "16", category: "تصرفات قانونية", ignored: false },
            { id: 27, arabic: "قبول", english: "Acceptance", type: "word", page: "16", category: "تصرفات قانونية", ignored: false },
            { id: 28, arabic: "التحكيم", english: "Arbitration", type: "word", page: "19", category: "قضاء بديل", ignored: false },
            { id: 29, arabic: "العقود المدنية", english: "Civil Contracts", type: "word", page: "17", category: "عقود", ignored: false },
            { id: 30, arabic: "العقود التجارية", english: "Commercial Contracts", type: "word", page: "17", category: "عقود", ignored: false },
            { id: 31, arabic: "العقود المسماة", english: "Nominal Contracts", type: "word", page: "17", category: "عقود", ignored: false },
            { id: 32, arabic: "العقود غير المسماة", english: "Non-nominal contracts", type: "word", page: "17", category: "عقود", ignored: false },
            { id: 33, arabic: "العقود الفورية", english: "Instant contracts", type: "word", page: "18", category: "عقود", ignored: false },
            { id: 34, arabic: "العقود المستمرة", english: "Continuous Contracts", type: "word", page: "18", category: "عقود", ignored: false },
            { id: 35, arabic: "العقود الشكلية", english: "Formal Contracts", type: "word", page: "18", category: "عقود", ignored: false }
        ];

        // Complex Paragraphs mapping for both Arabic/English Study & Cloze
        const passagesData = [
            {
                key: "law",
                title: "تعريف القانون (Law)",
                page: "3",
                arabic: "القانون هو عبارة عن مجموعة من القواعد العامة والمجردة والملزمة التي تنص الدولة على سنها أو تأمر بتطبيقها، مصحوبة بعقوبة حالية ومادية تفرضها السلطة العامة عند انتهاك هذه القواعد.",
                english: "Law is a set of general, abstract, and binding rules that states enact or order their application, accompanied by a present and material penalty imposed by the public authority when these rules are violated."
            },
            {
                key: "characteristics",
                title: "خصائص القانون (Characteristics)",
                page: "3",
                arabic: "خصائص القانون: أولاً: قاعدة عامة ومجردة. ثانياً: القوانين هي شكل من أشكال الرقابة الاجتماعية التي تحدد القواعد والنهج التي يفرض بها المجتمع الامتثال لأعرافه. ثالثاً: قاعدة ملزمة.",
                english: "Characteristics of law are first: a general and abstract rule. Second: Laws are a form of social control that outlines rules, habits, and customs a society uses to enforce conformity to its norms. Third: a binding rule."
            },
            {
                key: "contract",
                title: "تعريف العقد (Contract)",
                page: "16",
                arabic: "العقد هو أحد أهم مصادر الالتزام وهو عبارة عن اتفاق بين إرادتين لإحداث أثر قانوني، وينشأ حقوق والتزامات بين أطراف العقد. وبذلك ينشأ العقد عن طريق إيجاب من الطرف الأول يقابله قبول من الطرف الآخر.",
                english: "A contract is one of the most important sources of obligation, and it is an agreement between two wills to produce a legal effect that establishes rights and obligations between the parties of the contract. A contract is concluded by an offer from the first party which is accepted by the second party."
            },
            {
                key: "offer",
                title: "تعريف الإيجاب للتعاقد (Offer)",
                page: "16",
                arabic: "الإيجاب هو تعبير عن الرغبة للتعاقد يتم بنية أن يكون ملزماً على الشخص المعبر فور قبوله من الموجه إليه.",
                english: "An offer is essentially an expression of willingness to contract made with the intention that it shall become binding on the person making it as soon as it is accepted by the person to whom it is addressed."
            },
            {
                key: "acceptance",
                title: "تعريف القبول وأحكامه (Acceptance)",
                page: "16",
                arabic: "القبول: هو تعبير نهائي وغير مشروط بأحكام الإيجاب، يجوز إثبات حدوث القبول في تعاملات الأطراف.",
                english: "An acceptance is a final and unqualified expression of assent to the terms of an offer. Acceptance can be deemed to have taken place through the conduct of the parties."
            },
            {
                key: "arbitration",
                title: "تعريف التحكيم (Arbitration)",
                page: "19",
                arabic: "التحكيم هو الإجراء الذي يتم فيه عرض النزاع، باتفاق الأطراف، على محكم واحد أو أكثر لاتخاذ قرار ملزم بشأن النزاع. عند اختيار التحكيم، يختار الطرفان إجراءً خاصاً لتسوية المنازعات بدلاً من اللجوء إلى المحكمة.",
                english: "Arbitration is a procedure in which a dispute is submitted, by agreement of the parties, to one or more arbitrators who make a binding decision on the dispute. In choosing arbitration, the parties opt for a private dispute resolution instead of court litigation."
            },
            {
                key: "arbitration_char",
                title: "خصائص التحكيم (Arbitration Characteristics)",
                page: "19",
                arabic: "الخصائص الرئيسية للتحكيم هي: 1- التحكيم رضائي. 2- حرية الأطراف في اختيار المحكمين. 3- التحكيم محايد. 4- سرية التحكيم. 5- قرار هيئة التحكيم نهائي وقابل للتنفيذ.",
                english: "The main characteristics of arbitration are: 1- Arbitration is consensual. 2- The parties' freedom to choose the arbitrator. 3- Arbitration is neutral. 4- Confidentiality of Arbitration. 5- The decision of the arbitral tribunal is final and enforceable."
            }
        ];

        // Cloze tests sub-mapping
        const definitionsData = {
            law: {
                title: "تعريف القانون",
                arabic: passagesData[0].arabic,
                fullEnglish: passagesData[0].english,
                blanks: [
                    { word: "set", index: 1 }, { word: "general", index: 2 }, { word: "abstract", index: 3 }, { word: "binding", index: 4 }, { word: "states", index: 5 }, { word: "application", index: 6 }, { word: "present", index: 7 }, { word: "material", index: 8 }, { word: "penalty", index: 9 }, { word: "violated", index: 10 }
                ],
                passage: "Law is a {set} of {general}, {abstract}, and {binding} rules that {states} enact or order their {application}, accompanied by a {present} and {material} {penalty} imposed by the public authority when these rules are {violated}."
            },
            characteristics: {
                title: "خصائص القانون ومفهوم الضبط الاجتماعي",
                arabic: passagesData[1].arabic,
                fullEnglish: passagesData[1].english,
                blanks: [
                    { word: "general", index: 1 }, { word: "abstract", index: 2 }, { word: "social", index: 3 }, { word: "control", index: 4 }, { word: "customs", index: 5 }, { word: "enforce", index: 6 }, { word: "norms", index: 7 }, { word: "binding", index: 8 }
                ],
                passage: "Characteristics of law are first: a {general} and {abstract} rule. Second: Laws are a form of {social} {control} that outlines rules, habits, and {customs} a society uses to {enforce} conformity to its {norms}. Third: a {binding} rule."
            },
            contract: {
                title: "تعريف العقد وأطرافه",
                arabic: passagesData[2].arabic,
                fullEnglish: passagesData[2].english,
                blanks: [
                    { word: "contract", index: 1 }, { word: "sources", index: 2 }, { word: "obligation", index: 3 }, { word: "agreement", index: 4 }, { word: "wills", index: 5 }, { word: "legal", index: 6 }, { word: "rights", index: 7 }, { word: "concluded", index: 8 }, { word: "offer", index: 9 }, { word: "accepted", index: 10 }
                ],
                passage: "A {contract} is one of the most important {sources} of {obligation}, and it is an {agreement} between two {wills} to produce a {legal} effect that establishes {rights} and obligations between the parties of the contract. A contract is {concluded} by an {offer} from the first party which is {accepted} by the second party."
            },
            offer: {
                title: "تعريف الإيجاب للتعاقد",
                arabic: passagesData[3].arabic,
                fullEnglish: passagesData[3].english,
                blanks: [
                    { word: "offer", index: 1 }, { word: "willingness", index: 2 }, { word: "intention", index: 3 }, { word: "binding", index: 4 }, { word: "accepted", index: 5 }, { word: "addressed", index: 6 }
                ],
                passage: "An {offer} is essentially an expression of {willingness} to contract made with the {intention} that it shall become {binding} on the person making it as soon as it is {accepted} by the person to whom it is {addressed}."
            },
            acceptance: {
                title: "تعريف القبول وأحكامه",
                arabic: passagesData[4].arabic,
                fullEnglish: passagesData[4].english,
                blanks: [
                    { word: "acceptance", index: 1 }, { word: "final", index: 2 }, { word: "unqualified", index: 3 }, { word: "assent", index: 4 }, { word: "deemed", index: 5 }, { word: "conduct", index: 6 }
                ],
                passage: "An {acceptance} is a {final} and {unqualified} expression of {assent} to the terms of an offer. Acceptance can be {deemed} to have taken place through the {conduct} of the parties."
            },
            arbitration: {
                title: "تعريف التحكيم التجاري والدولي",
                arabic: passagesData[5].arabic,
                fullEnglish: passagesData[5].english,
                blanks: [
                    { word: "Arbitration", index: 1 }, { word: "procedure", index: 2 }, { word: "dispute", index: 3 }, { word: "submitted", index: 4 }, { word: "agreement", index: 5 }, { word: "arbitrators", index: 6 }, { word: "binding", index: 7 }, { word: "private", index: 8 }, { word: "litigation", index: 9 }
                ],
                passage: "{Arbitration} is a {procedure} in which a {dispute} is {submitted}, by {agreement} of the parties, to one or more {arbitrators} who make a {binding} decision on the dispute. In choosing arbitration, the parties opt for a {private} dispute resolution instead of court {litigation}."
            },
            arbitration_char: {
                title: "خصائص ومبادئ التحكيم الأساسية",
                arabic: passagesData[6].arabic,
                fullEnglish: passagesData[6].english,
                blanks: [
                    { word: "consensual", index: 1 }, { word: "freedom", index: 2 }, { word: "arbitrator", index: 3 }, { word: "neutral", index: 4 }, { word: "Confidentiality", index: 5 }, { word: "tribunal", index: 6 }, { word: "final", index: 7 }, { word: "enforceable", index: 8 }
                ],
                passage: "The main characteristics of arbitration are: 1- Arbitration is {consensual}. 2- The parties' {freedom} to choose the {arbitrator}. 3- Arbitration is {neutral}. 4- {Confidentiality} of Arbitration. 5- The decision of the arbitral {tribunal} is {final} and {enforceable}."
            }
        };

        // Application State
        let state = {
            userId: null,
            userTitle: "دكتور",
            userName: "الباحث",
            score: 0,
            completedExercises: 0,
            failures: [], // tracked failed terms
            failedPassages: [], // tracked failed passages
            customTerms: [], // user-added terms
            reviewFilter: 'all', // 'all', 'failures', 'custom', 'passage-mistakes'

            // Hide states
            hideArStudy: false,
            hideEnStudy: false,

            // Study tabs sub view: 'words' | 'passages'
            studySubTab: 'words',

            // Flashcards state
            flashcardIndex: 0,
            activeFlashcards: [],

            // Match game state
            matchSelectedId: null,
            matchTimerInterval: null,
            matchElapsedTime: 0,
            matchPairs: [],

            // Quiz state
            quizCurrentIndex: 0,
            quizQuestions: [],
            quizScore: 0,

            // Writing practice state
            writingCurrentIndex: 0,
            writingTerms: [],

            // Exam variables
            examStarted: false,
            examTimeRemaining: 7200, // 2 hours
            examTimerInterval: null,
            examAnswersQ1: {},
            examAnswersQ2: "",
            examAnswersQ3: "",
            
            // Smart mode
            randomSortMode: true
        };

        function changeReviewFilter() {
            state.reviewFilter = document.getElementById('review-filter-select').value;
            showToast("تم تحديث نطاق المراجعة", true);
        }

        let selectedGenderType = "male";
        let fontScale = 100;

        function changeFontSize(direction) {
            if (direction === 'increase') {
                if (fontScale < 140) fontScale += 10;
            } else if (direction === 'decrease') {
                if (fontScale > 80) fontScale -= 10;
            }
            document.documentElement.style.setProperty('--font-scale', fontScale + '%');
            localStorage.setItem('fontScale', fontScale);
        }

        // --- CLOUD SYNC & LOGIN LOGIC ---
        function processLogin() {
            const phone = document.getElementById('login-phone-input').value.trim();
            if (phone.length < 4) {
                showToast("الرجاء إدخال رقم هاتف صحيح", false);
                return;
            }
            
            // Temporarily save ID in state for the next step, don't write to localStorage yet
            state.userId = phone;
            document.getElementById('login-modal').classList.add('hidden');
            
            showToast("جاري التحقق من السحابة...", true);
            
            // Fetch from Firestore
            db.collection("users").doc(phone).get().then(doc => {
                if (doc.exists) {
                    localStorage.setItem('user_device_id', phone); // Commit ID
                    const data = doc.data();
                    if (data.score) localStorage.setItem('userScore', data.score);
                    if (data.name) localStorage.setItem('userName', data.name);
                    if (data.title) localStorage.setItem('userTitle', data.title);
                    if (data.failures) localStorage.setItem('userFailures', JSON.stringify(data.failures));
                    if (data.failedPassages) localStorage.setItem('userFailedPassages', JSON.stringify(data.failedPassages));
                    if (data.completedExercises) localStorage.setItem('userCompletedExercises', data.completedExercises);
                    if (data.customTerms) {
                        state.customTerms = data.customTerms;
                        localStorage.setItem('userCustomTerms', JSON.stringify(data.customTerms));
                    }
                    
                    showToast("تم تسجيل الدخول واسترجاع بياناتك بنجاح!", true);
                    setTimeout(() => location.reload(), 1500);
                } else {
                    // New user! Show profile setup
                    document.getElementById('profile-setup-modal').classList.remove('hidden');
                }
            }).catch(e => {
                console.error("Login fetch error:", e);
                showToast("حدث خطأ في الاتصال بالسحابة.", false);
                document.getElementById('login-modal').classList.add('hidden');
            });
        }

        function submitProfileSetup() {
            const name = document.getElementById('setup-username').value.trim();
            const title = document.getElementById('setup-title').value;
            
            if (!name) {
                showToast("الرجاء إدخال اسمك أولاً", false);
                return;
            }
            
            localStorage.setItem('user_device_id', state.userId);
            localStorage.setItem('userName', name);
            localStorage.setItem('userTitle', title);
            state.userName = name;
            state.userTitle = title;
            
            document.getElementById('profile-setup-modal').classList.add('hidden');
            showToast("تم إنشاء الحساب بنجاح! جاري التهيئة...", true);
            db.collection("users").doc(state.userId).set({
                name: state.userName,
                title: state.userTitle,
                score: state.score,
                completedExercises: state.completedExercises || 0,
                failures: state.failures || [],
                failedPassages: state.failedPassages || [],
                customTerms: state.customTerms || [],
                lastActive: firebase.firestore.FieldValue.serverTimestamp(),
                appVersion: APP_VERSION
            }, { merge: true });
            setTimeout(() => location.reload(), 1500);
        }

        function getUserId() {
            return localStorage.getItem('user_device_id');
        }

        function updateCloudField(field, value) {
            const uid = getUserId();
            if (!uid || !state.userName || state.userName === "ضيف") return;
            const obj = {};
            obj[field] = value;
            obj['lastActive'] = firebase.firestore.FieldValue.serverTimestamp();
            db.collection("users").doc(uid).update(obj).catch(err => {
                db.collection("users").doc(uid).set(obj, { merge: true });
            });
        }

        function updateCloudArray(field, item, isAdd = true) {
            const uid = getUserId();
            if (!uid || !state.userName || state.userName === "ضيف") return;
            const obj = {};
            obj[field] = isAdd ? firebase.firestore.FieldValue.arrayUnion(item) : firebase.firestore.FieldValue.arrayRemove(item);
            obj['lastActive'] = firebase.firestore.FieldValue.serverTimestamp();
            db.collection("users").doc(uid).update(obj).catch(err => {
                const fallbackObj = { lastActive: firebase.firestore.FieldValue.serverTimestamp() };
                fallbackObj[field] = isAdd ? [item] : [];
                db.collection("users").doc(uid).set(fallbackObj, { merge: true });
            });
        }

        function checkAutoUpdate() {
            db.collection('settings').doc('appInfo').get().then(doc => {
                if (doc.exists) {
                    const latestVersion = doc.data().latest_version;
                    if (latestVersion && latestVersion !== APP_VERSION) {
                        document.getElementById('update-modal').classList.remove('hidden');
                    }
                }
            }).catch(e => console.log("Update check failed", e));
        }

        // Removed periodic sync. Relying on event-based sync.

        (function initApp() {
            const uid = getUserId();
            if (!uid) {
                document.getElementById('login-modal').classList.remove('hidden');
            } else {
                state.userId = uid;
            }
            checkAutoUpdate();
            
            // Load saved font scale
            const savedScale = localStorage.getItem('fontScale');
            if (savedScale) {
                fontScale = parseInt(savedScale);
                document.documentElement.style.setProperty('--font-scale', fontScale + '%');
            }
            
            // Load saved user profile
            const savedName = localStorage.getItem('userName');
            const savedTitle = localStorage.getItem('userTitle');
            const savedGender = localStorage.getItem('selectedGenderType');
            
            if (savedName && savedTitle) {
                state.userName = savedName;
                state.userTitle = savedTitle;
                if (savedGender) selectedGenderType = savedGender;
                
                // Apply personalization
                const welcomeHeader = document.getElementById('user-header-welcome');
                if (welcomeHeader) welcomeHeader.innerText = `${state.userTitle} / ${state.userName}`;
                
                const greetingDash = document.getElementById('dash-greeting');
                if (greetingDash) greetingDash.innerText = `أهلاً بك يا ${state.userTitle} ${state.userName}`;
            }
            
            // Load user score
            const savedScore = localStorage.getItem('userScore');
            if (savedScore !== null) {
                state.score = parseInt(savedScore);
                const scoreVal = document.getElementById('score-val');
                if (scoreVal) scoreVal.innerText = state.score;
            }

            // Load failures and failed passages
            const savedFailures = localStorage.getItem('userFailures');
            if (savedFailures) state.failures = JSON.parse(savedFailures);
            
            const savedFailedPassages = localStorage.getItem('userFailedPassages');
            if (savedFailedPassages) state.failedPassages = JSON.parse(savedFailedPassages);

            // Load saved completed exercises
            const savedCompletedExercises = localStorage.getItem('userCompletedExercises');
            if (savedCompletedExercises) state.completedExercises = parseInt(savedCompletedExercises);

            // Load custom terms and inject into glossary
            const savedCustomTerms = localStorage.getItem('userCustomTerms');
            if (savedCustomTerms) {
                state.customTerms = JSON.parse(savedCustomTerms);
                // Reverse so that unshift adds them in the correct original order
                [...state.customTerms].reverse().forEach(term => {
                    if (!glossaryData.some(g => g.arabic === term.arabic && g.english === term.english)) {
                        glossaryData.unshift(term);
                    }
                });
            }

            // Initiate app views
            initStudyMode();
            renderMistakesWidget();
            if (typeof renderPassageMistakesWidget === 'function') renderPassageMistakesWidget();
            
            // Initial cloud sync
            setupRealtimeSync();
        })();
        
        function setupRealtimeSync() {
            const uid = getUserId();
            if (!uid) return;
            
            db.collection("users").doc(uid).onSnapshot(doc => {
                if (doc.exists) {
                    const data = doc.data();
                    let needsUIUpdate = false;

                    if (data.score !== undefined && data.score > (state.score || 0)) {
                        state.score = data.score;
                        localStorage.setItem('userScore', state.score);
                        const sv = document.getElementById('score-val');
                        if (sv) sv.innerText = state.score;
                    }
                    if (data.completedExercises !== undefined && data.completedExercises > (state.completedExercises || 0)) {
                        state.completedExercises = data.completedExercises;
                        localStorage.setItem('userCompletedExercises', state.completedExercises);
                    }
                    
                    const getTermKeys = arr => (arr || []).map(a => a.arabic).sort().join(',');
                    if (data.customTerms && getTermKeys(data.customTerms) !== getTermKeys(state.customTerms)) {
                        state.customTerms = data.customTerms;
                        localStorage.setItem('userCustomTerms', JSON.stringify(data.customTerms));
                        needsUIUpdate = true;
                    }
                    
                    const getFailKeys = arr => (arr || []).map(a => a.id || a.title || a.arabic).sort().join(',');
                    if (data.failures && getFailKeys(data.failures) !== getFailKeys(state.failures)) {
                        state.failures = data.failures;
                        localStorage.setItem('userFailures', JSON.stringify(data.failures));
                        needsUIUpdate = true;
                    }
                    
                    if (data.failedPassages && getFailKeys(data.failedPassages) !== getFailKeys(state.failedPassages)) {
                        state.failedPassages = data.failedPassages;
                        localStorage.setItem('userFailedPassages', JSON.stringify(data.failedPassages));
                        needsUIUpdate = true;
                    }

                    if (needsUIUpdate) {
                        // Refresh custom terms in glossary
                        if (state.customTerms) {
                            // Remove existing custom terms
                            for (let i = glossaryData.length - 1; i >= 0; i--) {
                                if (glossaryData[i].isCustom) glossaryData.splice(i, 1);
                            }
                            
                            // Inject fresh custom terms
                            [...state.customTerms].reverse().forEach(term => {
                                if (!glossaryData.some(g => g.arabic === term.arabic && g.english === term.english)) {
                                    glossaryData.unshift(term);
                                }
                            });
                        }
                        
                        updateDashboardStats();
                        renderMistakesWidget();
                        if (typeof renderPassageMistakesWidget === 'function') renderPassageMistakesWidget();
                        
                        // Render study lists again in case we are looking at them
                        initStudyMode();
                        if (typeof renderVocabSettingsList === 'function') renderVocabSettingsList();
                        
                        const isPlaying = !document.getElementById('game-playground-container').classList.contains('hidden');
                        if (isPlaying) {
                            showToast("تم مزامنة بياناتك الجديدة في الخلفية بياضاً.", true);
                        }
                    }
                }
            }, e => console.log("Realtime sync failed", e));
        }

        function toggleInstallModal() {
            const modal = document.getElementById('install-modal');
            modal.classList.toggle('hidden');
        }

        function updateDashboardStats() {
            document.getElementById('score-val').innerText = state.score;
            localStorage.setItem('userScore', state.score);
            if (typeof updateCloudField === 'function') updateCloudField('score', state.score);
        }

        function incrementCompletedExercises() {
            state.completedExercises = (state.completedExercises || 0) + 1;
            localStorage.setItem('userCompletedExercises', state.completedExercises);
            if (typeof updateCloudField === 'function') updateCloudField('completedExercises', state.completedExercises);
        }

        function toggleFailuresOnlyMode() {
            state.failuresOnlyMode = !state.failuresOnlyMode;
            const container = document.getElementById('failures-mode-container');
            const toggle = document.getElementById('failures-mode-toggle');
            const knob = document.getElementById('failures-mode-knob');
            const title = document.getElementById('failures-mode-title');
            const desc = document.getElementById('failures-mode-desc');
            
            if(state.failuresOnlyMode) {
                container.className = "mt-3 bg-red-950/20 border border-red-500/30 p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all";
                toggle.className = "w-10 h-6 bg-red-500 rounded-full flex items-center p-1 transition-all";
                knob.className = "w-4 h-4 bg-white rounded-full shadow-md transition-all transform -translate-x-4";
                title.className = "text-xs font-bold text-red-400";
                title.innerText = "تحدي الصعوبات والأخطاء فقط";
                desc.className = "text-[9px] text-red-300/70";
                desc.innerText = "تم قصر التمارين على أخطائك السابقة فقط.";
                showToast("تم تفعيل وضع التحدي للصعوبات فقط!", false);
            } else {
                container.className = "mt-3 bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-all";
                toggle.className = "w-10 h-6 bg-slate-800 rounded-full flex items-center p-1 transition-all";
                knob.className = "w-4 h-4 bg-slate-400 rounded-full shadow-md transition-all transform translate-x-0";
                title.className = "text-xs font-bold text-slate-300";
                title.innerText = "الوضع الذكي (تفضيل الأخطاء)";
                desc.className = "text-[9px] text-slate-500";
                desc.innerText = "انقر لقصر التمارين على الكلمات والقطع الصعبة فقط.";
                showToast("تم إيقاف وضع تحدي الصعوبات.", false);
            }
        }

        function toggleRandomSortMode() {
            state.randomSortMode = !state.randomSortMode;
            const toggle = document.getElementById('random-sort-toggle');
            const knob = document.getElementById('random-sort-knob');
            const title = document.getElementById('random-sort-title');
            
            if(state.randomSortMode) {
                toggle.className = "w-10 h-6 bg-amber-500 rounded-full flex items-center p-1 transition-all";
                knob.className = "w-4 h-4 bg-white rounded-full shadow-md transition-all transform -translate-x-4";
                title.className = "text-xs font-bold text-amber-400";
                title.innerText = "ترتيب عشوائي";
                showToast("تم تفعيل الترتيب العشوائي", true);
            } else {
                toggle.className = "w-10 h-6 bg-slate-800 rounded-full flex items-center p-1 transition-all";
                knob.className = "w-4 h-4 bg-slate-400 rounded-full shadow-md transition-all transform translate-x-0";
                title.className = "text-xs font-bold text-slate-300";
                title.innerText = "ترتيب متسلسل";
                showToast("تم إيقاف الترتيب العشوائي", false);
            }
        }

        function switchTab(tabId) {
            const panes = document.querySelectorAll('.tab-pane');
            panes.forEach(pane => {
                pane.classList.add('hidden');
                pane.classList.remove('block');
            });

            const targetPane = document.getElementById('tab-' + tabId);
            if (targetPane) {
                targetPane.classList.remove('hidden');
                targetPane.classList.add('block');
            }

            // Highlighting mobile nav icons
            const mobileBtns = document.querySelectorAll('.mobile-nav button');
            mobileBtns.forEach(btn => {
                btn.classList.remove('active-tab-nav');
                btn.classList.add('text-slate-400');
            });

            const currentMobileBtn = document.getElementById('mobile-nav-' + tabId);
            if (currentMobileBtn) {
                currentMobileBtn.classList.add('active-tab-nav');
                currentMobileBtn.classList.remove('text-slate-400');
            }

            // Highlighting desktop nav icons
            const desktopBtns = document.querySelectorAll('nav.sm\\:flex button');
            desktopBtns.forEach(btn => {
                btn.classList.remove('active-tab-nav');
                btn.classList.add('text-slate-400');
            });

            const currentDesktopBtn = document.getElementById('desktop-nav-' + tabId);
            if (currentDesktopBtn) {
                currentDesktopBtn.classList.add('active-tab-nav');
                currentDesktopBtn.classList.remove('text-slate-400');
            }

            // Actions on load
            if (tabId === 'study') {
                initStudyMode();
            } else if (tabId === 'review') {
                // Keep Selection open, hide gameplay
                document.getElementById('games-selection-hub').classList.remove('hidden');
                document.getElementById('game-playground-container').classList.add('hidden');
            } else if (tabId === 'user') {
                const settingsUser = document.getElementById('settings-username');
                const settingsTitle = document.getElementById('settings-title');
                if (settingsUser) settingsUser.value = state.userName || '';
                if (settingsTitle) settingsTitle.value = state.userTitle || 'دكتور';
                if(typeof switchSettingsSubTab === 'function') switchSettingsSubTab('profile');
            }
        }

        function switchGameSubTab(tab) {
            document.getElementById('games-subtab-words').classList.toggle('hidden', tab !== 'words');
            document.getElementById('games-subtab-passages').classList.toggle('hidden', tab !== 'passages');
            
            const wordsBtn = document.getElementById('games-tab-words');
            const passagesBtn = document.getElementById('games-tab-passages');
            
            if (tab === 'words') {
                wordsBtn.className = "flex-1 py-2 text-xs font-bold rounded-lg transition-all bg-amber-500 text-slate-900 shadow-sm";
                passagesBtn.className = "flex-1 py-2 text-xs font-bold rounded-lg transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-900";
            } else {
                passagesBtn.className = "flex-1 py-2 text-xs font-bold rounded-lg transition-all bg-emerald-500 text-slate-900 shadow-sm";
                wordsBtn.className = "flex-1 py-2 text-xs font-bold rounded-lg transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-900";
            }
        }

        // SPEECH AUDIO ENGINE (MOBILE-FRIENDLY GOOGLE TRANSLATE MP3)
        let currentAudio = null;

        function fallbackSpeechSynthesis(text) {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.85;
                window.speechSynthesis.speak(utterance);
            } else {
                showToast("محرك نطق الصوت غير مدعوم في جهازك.", false);
            }
        }

        function playGoogleTTS(text) {
            // Safari iOS Hack: Unlock speechSynthesis synchronously first so it works inside async catch blocks
            if ('speechSynthesis' in window) {
                const unlockUtterance = new SpeechSynthesisUtterance('');
                unlockUtterance.volume = 0;
                window.speechSynthesis.speak(unlockUtterance);
            }

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            try {
                // Use unofficial Google Translate TTS endpoint for 100% natural voice on all devices
                // Note: changed from tw-ob to gtx for better mobile compatibility
                const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=gtx&q=${encodeURIComponent(text)}`;
                currentAudio = new Audio(url);
                
                currentAudio.onerror = () => {
                    console.log("Audio play failed (maybe too long?), using fallback.");
                    fallbackSpeechSynthesis(text);
                };
                
                currentAudio.play().catch(e => {
                    console.log("Audio play blocked by browser, using fallback:", e);
                    fallbackSpeechSynthesis(text);
                });
            } catch(err) {
                fallbackSpeechSynthesis(text);
            }
        }

        function speakWord(text) {
            playGoogleTTS(text);
        }

        function speakCurrentWord(event) {
            if (event) event.stopPropagation();
            const currentItem = state.activeFlashcards[state.flashcardIndex];
            if (currentItem) {
                speakWord(currentItem.english);
            }
        }

        function showToast(message, isSuccess = true) {
            const toast = document.createElement('div');
            toast.className = `fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold transition-all duration-300 flex items-center gap-2 text-center ${isSuccess ? 'bg-emerald-950 border border-emerald-500/50 text-emerald-300' : 'bg-red-950 border border-red-500/50 text-red-300'}`;
            toast.innerHTML = `<span>${isSuccess ? '✔' : '⚠️'}</span><span>${message}</span>`;
            document.body.appendChild(toast);
            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-2');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        // IGNORE/EASY WORD LOGIC TO SAVE EFFORT IN REVIEWS AND EXAMS
        function toggleIgnoreTerm(id) {
            const item = glossaryData.find(t => t.id === id);
            if (item) {
                item.ignored = !item.ignored;
                showToast(item.ignored ? `تم استبعاد [${item.arabic}] من المراجعة والأسئلة` : `تمت إعادة تفعيل [${item.arabic}] في الألعاب`);
                initStudyMode();
                updateOverallProgress();
            }
        }

        function updateOverallProgress() {
            const total = glossaryData.length;
            const ignoredCount = glossaryData.filter(t => t.ignored).length;
            const percent = Math.round((ignoredCount / total) * 100);
            
            document.getElementById('progress-circle').setAttribute('stroke-dasharray', `${percent}, 100`);
            document.getElementById('progress-percentage-val').innerText = `${percent}%`;
        }

        function addMistake(term) {
            if (!state.failures.some(item => item.id === term.id)) {
                state.failures.push(term);
                localStorage.setItem('userFailures', JSON.stringify(state.failures));
                renderMistakesWidget();
                if (typeof updateCloudArray === 'function') updateCloudArray('failures', term, true);
            }
        }

        function removeMistake(id) {
            const term = state.failures.find(t => t.id === id);
            if (!term) return;
            state.failures = state.failures.filter(t => t.id !== id);
            localStorage.setItem('userFailures', JSON.stringify(state.failures));
            renderMistakesWidget();
            if (typeof updateCloudArray === 'function') updateCloudArray('failures', term, false);
        }

        function renderMistakesWidget() {
            const container = document.getElementById('dash-mistakes-container');
            if (state.failures.length === 0) {
                container.innerHTML = `<p class="text-[10px] text-slate-500 text-center py-4">لا توجد أخطاء مسجلة حالياً. واصل تفوقك!</p>`;
                return;
            }

            container.innerHTML = '';
            state.failures.forEach(item => {
                const row = document.createElement('div');
                row.className = "flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-red-900/30 text-[11px]";
                row.innerHTML = `
                    <div class="text-right">
                        <span class="font-bold text-slate-200">${item.arabic}</span>
                        <span class="english-text text-amber-500 font-bold ml-2">${item.english}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <button onclick="speakWord('${item.english}')" class="text-xs bg-slate-900 p-1.5 rounded-lg border border-slate-800">🔊</button>
                        <button onclick="removeMistake(${item.id})" class="text-[9px] bg-red-950 text-red-300 font-bold px-2 py-1 rounded-lg">إزالة ✓</button>
                    </div>
                `;
                container.appendChild(row);
            });
        }

        function addPassageMistake(def) {
            if (!state.failedPassages.some(item => item.title === def.title)) {
                state.failedPassages.push(def);
                localStorage.setItem('userFailedPassages', JSON.stringify(state.failedPassages));
                renderPassageMistakesWidget();
                
                // Extract to glossary automatically
                const passageTextEn = def.passage || def.english || def.fullEnglish;
                const passageTextAr = def.arabic;
                if (passageTextEn && !state.customTerms.some(t => t.english === passageTextEn)) {
                    const newId = glossaryData.length > 0 ? Math.max(...glossaryData.map(t => t.id)) + 1 : 1;
                    const newTerm = {
                        id: newId,
                        arabic: passageTextAr,
                        english: passageTextEn,
                        type: "passage_mistake",
                        page: def.page || "-",
                        category: "أخطاء القطع",
                        ignored: false,
                        isCustom: true
                    };
                    state.customTerms.push(newTerm);
                    glossaryData.unshift(newTerm);
                    localStorage.setItem('userCustomTerms', JSON.stringify(state.customTerms));
                    
                    if (typeof updateCloudArray === 'function') updateCloudArray('customTerms', newTerm, true);
                    if (typeof renderVocabSettingsList === 'function') renderVocabSettingsList();
                }
            }
        }

        function removePassageMistake(title) {
            const def = state.failedPassages.find(t => t.title === title);
            if (!def) return;
            state.failedPassages = state.failedPassages.filter(t => t.title !== title);
            localStorage.setItem('userFailedPassages', JSON.stringify(state.failedPassages));
            renderPassageMistakesWidget();
            if (typeof updateCloudArray === 'function') updateCloudArray('failedPassages', def, false);
        }

        function renderPassageMistakesWidget() {
            const container = document.getElementById('dash-passages-mistakes-container');
            if (!container) return;
            if (state.failedPassages.length === 0) {
                container.innerHTML = `<p class="text-[10px] text-slate-500 text-center py-4">أداؤك ممتاز! لا توجد قطع صعبة مسجلة.</p>`;
                return;
            }

            container.innerHTML = '';
            state.failedPassages.forEach(item => {
                const row = document.createElement('div');
                row.className = "flex justify-between items-center bg-slate-950 p-2.5 rounded-xl border border-red-900/30 text-[11px] mb-1.5";
                row.innerHTML = `
                    <div class="text-right flex-1 truncate ml-2">
                        <span class="font-bold text-slate-200 block truncate" title="${item.title}">${item.title}</span>
                    </div>
                    <div class="flex items-center gap-1.5 shrink-0">
                        <button onclick="removePassageMistake('${item.title}')" class="text-[9px] bg-red-950 text-red-300 font-bold px-2 py-1 rounded-lg">إزالة ✓</button>
                    </div>
                `;
                container.appendChild(row);
            });
        }

        // --- TAB 2: STUDY HUB (WORDS & PASSAGES SUB-TABS) ---
        function switchStudySubTab(type) {
            state.studySubTab = type;
            const btnWords = document.getElementById('btn-study-sub-words');
            const btnPassages = document.getElementById('btn-study-sub-passages');
            
            const tabWords = document.getElementById('study-subtab-words');
            const tabPassages = document.getElementById('study-subtab-passages');
            
            const wordsFilterHeader = document.getElementById('study-sub-words-header');

            if (type === 'words') {
                btnWords.className = "py-2.5 text-center text-xs font-black rounded-xl text-amber-400 bg-slate-900 border border-amber-500/10 transition shadow";
                btnPassages.className = "py-2.5 text-center text-xs font-black rounded-xl text-slate-400 hover:bg-slate-900/50 transition";
                
                tabWords.classList.remove('hidden');
                tabPassages.classList.add('hidden');
                wordsFilterHeader.classList.remove('hidden');
            } else {
                btnPassages.className = "py-2.5 text-center text-xs font-black rounded-xl text-amber-400 bg-slate-900 border border-amber-500/10 transition shadow";
                btnWords.className = "py-2.5 text-center text-xs font-black rounded-xl text-slate-400 hover:bg-slate-900/50 transition";
                
                tabPassages.classList.remove('hidden');
                tabWords.classList.add('hidden');
                wordsFilterHeader.classList.add('hidden');
                renderStudyPassages();
            }
        }

        let settingsSubTab = 'profile';
        function switchSettingsSubTab(type) {
            settingsSubTab = type;
            const btnProfile = document.getElementById('btn-settings-sub-profile');
            const btnAddTerm = document.getElementById('btn-settings-sub-add-term');
            const btnManage = document.getElementById('btn-settings-sub-manage-terms');
            
            const tabProfile = document.getElementById('settings-subtab-profile');
            const tabAddTerm = document.getElementById('settings-subtab-add-term');
            const tabManage = document.getElementById('settings-subtab-manage-terms');
            
            // Reset buttons
            [btnProfile, btnAddTerm, btnManage].forEach(btn => {
                if(btn) {
                    btn.className = "py-2 text-center text-[10px] font-black rounded-xl text-slate-400 hover:bg-slate-900/50 transition";
                }
            });
            
            // Reset tabs
            [tabProfile, tabAddTerm, tabManage].forEach(tab => {
                if(tab) {
                    tab.classList.add('hidden');
                    tab.classList.remove('block');
                }
            });
            
            // Activate target
            if (type === 'profile') {
                if(btnProfile) btnProfile.className = "py-2 text-center text-[10px] font-black rounded-xl text-amber-400 bg-slate-900 border border-amber-500/10 transition shadow";
                if(tabProfile) { tabProfile.classList.remove('hidden'); tabProfile.classList.add('block'); }
            } else if (type === 'add-term') {
                if(btnAddTerm) btnAddTerm.className = "py-2 text-center text-[10px] font-black rounded-xl text-amber-400 bg-slate-900 border border-amber-500/10 transition shadow";
                if(tabAddTerm) { tabAddTerm.classList.remove('hidden'); tabAddTerm.classList.add('block'); }
            } else if (type === 'manage-terms') {
                if(btnManage) btnManage.className = "py-2 text-center text-[10px] font-black rounded-xl text-amber-400 bg-slate-900 border border-amber-500/10 transition shadow";
                if(tabManage) { tabManage.classList.remove('hidden'); tabManage.classList.add('block'); }
                renderVocabSettingsList(); // Ensure list is rendered
            }
        }


        function initStudyMode() {
            renderStudyVocabList(glossaryData);
        }

        function renderStudyVocabList(data) {
            const container = document.getElementById('study-subtab-words');
            container.innerHTML = '';

            data.forEach(item => {
                const card = document.createElement('div');
                card.className = `p-3 rounded-2xl border transition duration-150 flex justify-between items-center gap-3 ${item.ignored ? 'bg-slate-950/40 border-slate-900/80 opacity-50' : 'bg-slate-950/80 border-slate-850 hover:border-amber-500/20'}`;
                
                card.innerHTML = `
                    <div class="flex-grow text-right space-y-0.5">
                        <div class="flex items-center gap-1.5 flex-wrap">
                            <span class="font-bold text-xs sm:text-sm text-slate-100 transition-opacity duration-200" style="opacity: ${state.hideArStudy ? '0' : '1'}">${item.arabic}</span>
                            ${item.ignored ? '<span class="text-[8px] bg-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded font-black">✓ تم الحفظ</span>' : ''}
                        </div>
                        <p class="english-text text-xs sm:text-sm text-amber-400 font-bold transition-opacity duration-200" style="opacity: ${state.hideEnStudy ? '0' : '1'}">${item.english}</p>
                        <p class="text-[9px] text-slate-500">ص: ${item.page} | ${item.category}</p>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <button onclick="speakWord('${item.english}')" class="bg-slate-900 p-2 rounded-xl text-xs border border-slate-800 text-slate-300">🔊</button>
                        <button onclick="toggleIgnoreTerm(${item.id})" class="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 p-2 rounded-xl" title="علم كتم الحفظ واستبعده">
                            ${item.ignored ? '🔓 إلغاء' : '✓ حفظ'}
                        </button>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        function toggleStudyColumn(lang) {
            if (lang === 'ar') {
                state.hideArStudy = !state.hideArStudy;
                showToast(state.hideArStudy ? "تم إخفاء العمود العربي للتسميع" : "تم إظهار العمود العربي");
            } else {
                state.hideEnStudy = !state.hideEnStudy;
                showToast(state.hideEnStudy ? "تم إخفاء المقابلات الإنجليزية" : "تم إظهار المقابلات الإنجليزية");
            }
            initStudyMode();
        }

        function filterStudyVocabList() {
            const val = document.getElementById('study-vocab-search').value.trim().toLowerCase();
            const filtered = glossaryData.filter(item => 
                item.arabic.toLowerCase().includes(val) || 
                item.english.toLowerCase().includes(val)
            );
            renderStudyVocabList(filtered);
        }

        function renderStudyPassages() {
            const container = document.getElementById('study-subtab-passages');
            container.innerHTML = '';

            passagesData.forEach(p => {
                const card = document.createElement('div');
                card.className = "bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-2 text-right";
                card.innerHTML = `
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-black">${p.title}</span>
                        <span class="text-[9px] text-slate-500">الصفحة: ${p.page}</span>
                    </div>
                    <p class="text-xs text-slate-300 leading-relaxed border-r-2 border-amber-500 pr-3">${p.arabic}</p>
                    <p class="english-text text-xs text-slate-100 font-semibold text-left border-l-2 border-slate-800 pl-3 pt-1 select-all" dir="ltr">${p.english}</p>
                    <div class="flex justify-start">
                        <button onclick="speakWord('${p.english.replace(/'/g, "\\'")}')" class="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] font-bold px-2 py-1 rounded-lg">🔊 استمع للنص الكامل</button>
                    </div>
                `;
                container.appendChild(card);
            });
        }


        // --- TAB 3: REVIEW HUB & OVERLAY GAMES ---
        function getActiveTerms() {
            return glossaryData.filter(t => !t.ignored);
        }

        function getSmartTermsList() {
            let terms = getActiveTerms();
            
            if (state.reviewFilter === 'failures') {
                terms = terms.filter(t => state.failures.some(f => f.id === t.id));
            } else if (state.reviewFilter === 'custom') {
                terms = terms.filter(t => t.isCustom && t.category !== "أخطاء القطع");
            } else if (state.reviewFilter === 'passage-mistakes') {
                terms = terms.filter(t => t.isCustom && t.category === "أخطاء القطع");
            }
            return terms.map((t, idx) => {
                let isFailed = state.failures.some(f => f.id === t.id);
                let score = isFailed ? 5 : 0;
                if (state.randomSortMode) score += Math.random();
                return { term: t, score: score, index: idx };
            }).sort((a, b) => {
                if (a.score === b.score) return a.index - b.index;
                return b.score - a.score;
            }).map(x => x.term);
        }

        function launchReviewGame(gameType) {
            const container = document.getElementById('games-selection-hub');
            const playground = document.getElementById('game-playground-container');
            const mount = document.getElementById('game-mount-point');

            container.classList.add('hidden');
            playground.classList.remove('hidden');

            const smartTerms = getSmartTermsList();
            if (smartTerms.length === 0) {
                mount.innerHTML = `<p class="text-center text-xs text-red-400 py-6 font-bold">لا يوجد كلمات كافية للعب بهذا الوضع! (قد لا يكون لديك أخطاء مسجلة)</p>`;
                return;
            }

            if (gameType === 'flashcards') {
                document.getElementById('game-title-header').innerText = "بطاقات الاستذكار (Flashcards)";
                state.activeFlashcards = smartTerms;
                state.flashcardIndex = 0;
                mount.innerHTML = `
                    <div class="flex flex-col items-center justify-center space-y-4">
                        <div class="flip-card w-full max-w-sm h-60 cursor-pointer" id="active-card" onclick="flipActiveCard()">
                            <div class="flip-card-inner shadow-2xl border border-slate-800 rounded-3xl" id="card-inner">
                                <div class="flip-card-front bg-slate-950 flex flex-col justify-between p-6">
                                    <span class="text-[9px] text-slate-500 text-right">اضغط لقلب البطاقة 🔄</span>
                                    <h4 class="text-xl font-black text-slate-100" id="g-card-ar"></h4>
                                    <span id="g-card-cat" class="text-[9px] text-amber-500"></span>
                                </div>
                                <div class="flip-card-back bg-slate-900 border-2 border-amber-500/20 flex flex-col justify-between p-6">
                                    <div class="flex justify-between items-center">
                                        <span class="text-[9px] text-amber-500 font-bold">المقابل الإنجليزي</span>
                                        <button onclick="speakCurrentWord(event)" class="text-[9px] bg-slate-800 px-2 py-1 rounded text-white font-bold">🔊 نطق</button>
                                    </div>
                                    <h4 class="text-xl font-black text-amber-400 english-text" id="g-card-en"></h4>
                                    <span class="text-[9px] text-slate-500">اضغط للرجوع</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-2 w-full max-w-sm">
                            <button onclick="answerFlashcard(false)" class="flex-1 bg-red-950/60 border border-red-900 text-red-200 text-[11px] sm:text-xs py-2.5 rounded-xl font-bold">❌ صعبة</button>
                            <button onclick="skipFlashcard()" class="flex-1 bg-slate-800 border border-slate-700 text-slate-300 text-[11px] sm:text-xs py-2.5 rounded-xl font-bold">⏭️ تجاوز</button>
                            <button onclick="answerFlashcard(true)" class="flex-1 bg-emerald-950/60 border border-emerald-900 text-emerald-200 text-[11px] sm:text-xs py-2.5 rounded-xl font-bold">✔ حفظتها</button>
                        </div>
                        <p class="text-[10px] text-slate-500" id="g-card-progress"></p>
                    </div>
                `;
                renderPlaycard();
            } else if (gameType === 'match') {
                document.getElementById('game-title-header').innerText = "لعبة المطابقة السريعة (Match)";
                mount.innerHTML = `
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <span class="text-xs font-mono font-bold text-amber-500" id="match-timer-label">⏱️ المؤقت: 00:00</span>
                            <button onclick="launchReviewGame('match')" class="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-lg">إعادة خلط 🔄</button>
                        </div>
                        <div class="grid grid-cols-2 gap-2" id="playground-match-grid"></div>
                    </div>
                `;
                initPlaygroundMatch();
            } else if (gameType === 'spelling') {
                document.getElementById('game-title-header').innerText = "تحدي الكتابة الحرة والإملاء";
                state.writingTerms = getSmartTermsList();
                state.writingCurrentIndex = 0;
                mount.innerHTML = `
                    <div class="max-w-sm mx-auto space-y-4 text-center">
                        <div>
                            <span class="text-[9px] text-slate-500 block">المصطلح المطلوب كتابته بالعربية:</span>
                            <h4 id="g-spell-ar" class="text-xl font-black text-amber-400 mt-1"></h4>
                        </div>
                        <input type="text" id="g-spell-input" autocomplete="off" onkeydown="if(event.key === 'Enter') checkPlaygroundSpelling()" placeholder="اكتب المصطلح الإنجليزي المقابل..." class="w-full bg-slate-950 border border-slate-800 text-white rounded-xl py-3 text-center text-sm font-bold focus:border-amber-400 focus:outline-none">
                        <button onclick="checkPlaygroundSpelling()" class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs">تحقق من الإملاء</button>
                        <div class="flex justify-between items-center text-[10px] text-slate-500 px-1 mt-4">
                            <button onclick="revealSpellHint()" class="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-3 py-2 rounded-xl transition">💡 تلميح</button>
                            <span id="g-spell-hint-lbl" class="font-mono text-amber-500 font-bold"></span>
                            <button onclick="nextPlaygroundSpelling()" class="bg-red-950 hover:bg-red-900 text-red-300 font-bold px-5 py-2 rounded-xl border border-red-900/50 transition">تجاوز ⬅</button>
                        </div>
                    </div>
                `;
                renderPlaygroundSpelling();
            } else if (gameType === 'quiz') {
                document.getElementById('game-title-header').innerText = "اختبار الخيارات المتعددة (MCQ)";
                state.quizCurrentIndex = 0;
                state.quizScore = 0;
                
                const smartTerms = getSmartTermsList();
                const itemsCount = Math.min(10, smartTerms.length);
                state.quizQuestions = smartTerms.slice(0, itemsCount).map(item => {
                    const isArToEn = Math.random() > 0.5;
                    const alternatives = activeTerms
                        .filter(g => g.id !== item.id)
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 3)
                        .map(alt => isArToEn ? alt.english : alt.arabic);

                    const correctAnswer = isArToEn ? item.english : item.arabic;
                    const answersList = [...alternatives, correctAnswer].sort(() => 0.5 - Math.random());

                    return {
                        question: isArToEn ? `ما هو المقابل الإنجليزي لـ [${item.arabic}]؟` : `ما هو المعنى المقابل للمصطلح [${item.english}]؟`,
                        correctAnswer: correctAnswer,
                        answers: answersList,
                        termReference: item
                    };
                });

                mount.innerHTML = `
                    <div class="max-w-md mx-auto space-y-4">
                        <div class="flex justify-between text-xs text-slate-400">
                            <span id="g-quiz-progress-text">السؤال 1</span>
                            <span id="g-quiz-score-text">الدرجة: 0</span>
                        </div>
                        <div class="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                            <h4 id="g-quiz-question-lbl" class="text-sm font-bold text-slate-100"></h4>
                        </div>
                        <div class="space-y-2" id="g-quiz-answers-box"></div>
                        <div id="g-quiz-feedback-box" class="p-3 rounded-xl border hidden text-xs leading-relaxed text-right"></div>
                        <div class="mt-4 flex justify-end">
                            <button onclick="skipQuizQuestion()" class="bg-slate-800 border border-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-700 transition shadow-md">⏭️ تجاوز السؤال</button>
                        </div>
                    </div>
                `;
                renderPlaygroundQuizQuestion();
            } else if (gameType === 'cloze') {
                document.getElementById('game-title-header').innerText = "تحدي إكمال فراغات القطع (Cloze Test)";
                mount.innerHTML = `
                    <div class="space-y-4 text-right max-w-xl mx-auto">
                        <div id="cloze-selector-view" class="space-y-3">
                            <h4 class="text-xs font-bold text-slate-400 mb-2">اختر القطعة القانونية للتدريب عليها:</h4>
                            <div class="grid grid-cols-1 gap-2" id="cloze-passage-buttons"></div>
                        </div>
                        
                        <div id="cloze-play-view" class="hidden space-y-4">
                            <div class="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span class="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded font-black" id="cloze-title"></span>
                                <button onclick="exitClozeToSelector()" class="text-[10px] text-slate-400 hover:text-white transition">🔙 تغيير القطعة</button>
                            </div>
                            
                            <div class="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-850">
                                <span class="text-[9px] text-slate-500 block mb-1">الترجمة العربية للمساعدة:</span>
                                <p id="cloze-arabic-context" class="text-xs text-slate-300 leading-relaxed"></p>
                            </div>
                            
                            <div class="bg-slate-950 p-5 rounded-2xl border border-slate-850 text-left font-serif leading-relaxed text-slate-200 text-sm sm:text-base select-none" dir="ltr" id="cloze-passage-container">
                            </div>
                            
                            <div class="space-y-2">
                                <span class="text-[9px] text-slate-500 block text-right">الكلمات المتاحة (انقر على فراغ ثم انقر على الكلمة لوضعها):</span>
                                <div class="flex flex-wrap gap-2 justify-center" id="cloze-words-bank">
                                </div>
                            </div>
                            
                            <div class="flex gap-2">
                                <button onclick="checkClozeAnswer()" class="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-[10px] sm:text-xs transition">تحقق من الإجابة</button>
                                <button onclick="nextClozePassage()" class="flex-1 bg-blue-900 hover:bg-blue-800 text-blue-200 font-bold py-2.5 rounded-xl text-[10px] sm:text-xs transition shadow-md">التالية ⏭️</button>
                                <button onclick="prevClozePassage()" class="flex-1 bg-blue-900 hover:bg-blue-800 text-blue-200 font-bold py-2.5 rounded-xl text-[10px] sm:text-xs transition shadow-md">السابقة ⏮️</button>
                                <button onclick="resetClozeGame()" class="bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold px-3 py-2.5 rounded-xl text-[10px] sm:text-xs transition">إعادة</button>
                            </div>
                        </div>
                    </div>
                `;
                startClozeGameSelector();
            } else if (gameType === 'reorder') {
                document.getElementById('game-title-header').innerText = "تحدي ترتيب جمل القطعة (Sentence Reordering)";
                mount.innerHTML = `
                    <div class="space-y-4 text-right max-w-xl mx-auto">
                        <div id="reorder-selector-view" class="space-y-3">
                            <h4 class="text-xs font-bold text-slate-400 mb-2">اختر القطعة لترتيبها:</h4>
                            <div class="grid grid-cols-1 gap-2" id="reorder-passage-buttons"></div>
                        </div>
                        
                        <div id="reorder-play-view" class="hidden space-y-4">
                            <div class="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span class="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded font-black" id="reorder-title"></span>
                                <button onclick="exitReorderToSelector()" class="text-[10px] text-slate-400 hover:text-white transition">🔙 تغيير القطعة</button>
                            </div>
                            
                            <div class="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-850">
                                <span class="text-[9px] text-slate-500 block mb-1">السياق العربي للقطعة:</span>
                                <p id="reorder-arabic-context" class="text-xs text-slate-300 leading-relaxed"></p>
                            </div>
                            
                            <div class="bg-slate-950 p-5 rounded-2xl border border-slate-850 text-left font-serif leading-relaxed text-slate-200 text-sm sm:text-base min-h-[100px]" dir="ltr" id="reorder-constructed-container">
                            </div>
                            
                            <div class="space-y-2">
                                <span class="text-[9px] text-slate-500 block text-right">الأجزاء المبعثرة (انقر لترتيبها):</span>
                                <div class="flex flex-wrap gap-2 justify-end" id="reorder-chunks-bank" dir="ltr">
                                </div>
                            </div>
                            
                            <div class="flex gap-2">
                                <button onclick="checkReorderAnswer()" class="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-[10px] sm:text-xs transition">تحقق</button>
                                <button onclick="nextReorderPassage()" class="flex-1 bg-blue-900 hover:bg-blue-800 text-blue-200 font-bold py-2.5 rounded-xl text-[10px] sm:text-xs transition shadow-md">التالية ⏭️</button>
                                <button onclick="prevReorderPassage()" class="flex-1 bg-blue-900 hover:bg-blue-800 text-blue-200 font-bold py-2.5 rounded-xl text-[10px] sm:text-xs transition shadow-md">السابقة ⏮️</button>
                                <button onclick="resetReorderGame()" class="bg-slate-850 hover:bg-slate-800 text-slate-300 font-bold px-3 py-2.5 rounded-xl text-[10px] sm:text-xs transition">إعادة</button>
                                <button onclick="undoReorderChunk()" class="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-2.5 rounded-xl text-[10px] sm:text-xs transition">تراجع</button>
                            </div>
                        </div>
                    </div>
                `;
                startReorderGameSelector();
            } else if (gameType === 'passage_spelling') {
                document.getElementById('game-title-header').innerText = "تحدي إملاء القطع كاملة";
                mount.innerHTML = `
                    <div class="space-y-4 text-right max-w-xl mx-auto">
                        <div id="pspell-selector-view" class="space-y-3">
                            <h4 class="text-xs font-bold text-slate-400 mb-2">اختر القطعة لتسميعها كتابياً:</h4>
                            <div class="grid grid-cols-1 gap-2" id="pspell-passage-buttons"></div>
                        </div>
                        
                        <div id="pspell-play-view" class="hidden space-y-4">
                            <div class="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span class="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded font-black" id="pspell-title"></span>
                                <button onclick="exitPSpellToSelector()" class="text-[10px] text-slate-400 hover:text-white transition">🔙 تغيير القطعة</button>
                            </div>
                            
                            <div class="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-850">
                                <span class="text-[9px] text-slate-500 block mb-1">المطلوب ترجمته وكتابته بالإنجليزية:</span>
                                <p id="pspell-arabic-context" class="text-xs text-slate-300 leading-relaxed font-bold"></p>
                            </div>
                            
                            <textarea id="pspell-input" rows="4" onkeydown="if(event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); checkPSpellAnswer(); }" placeholder="اكتب الترجمة الإنجليزية هنا..." class="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-4 text-left text-sm font-serif focus:border-amber-400 focus:outline-none" dir="ltr"></textarea>
                            
                            <div class="flex gap-2">
                                <button onclick="checkPSpellAnswer()" class="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition">تحقق من الإملاء</button>
                                <button onclick="revealPSpellHint()" class="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-4 py-2.5 rounded-xl text-xs transition">💡 إظهار تلميح</button>
                            </div>
                            
                            <div id="pspell-feedback" class="hidden p-3 rounded-xl border text-xs leading-relaxed text-right mt-2"></div>
                        </div>
                    </div>
                `;
                startPSpellGameSelector();
            } else if (gameType === 'vanishing') {
                document.getElementById('game-title-header').innerText = "تحدي النص المتلاشي (Vanishing Text)";
                mount.innerHTML = `
                    <div class="space-y-4 text-right max-w-xl mx-auto">
                        <div id="vanishing-selector-view" class="space-y-3">
                            <h4 class="text-xs font-bold text-slate-400 mb-2">اختر القطعة لتحدي النص المتلاشي:</h4>
                            <div class="grid grid-cols-1 gap-2" id="vanishing-passage-buttons"></div>
                        </div>
                        
                        <div id="vanishing-play-view" class="hidden space-y-4">
                            <div class="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span class="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded font-black" id="vanishing-title"></span>
                                <button onclick="exitVanishingToSelector()" class="text-[10px] text-slate-400 hover:text-white transition">🔙 تغيير القطعة</button>
                            </div>
                            
                            <div class="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-850">
                                <span class="text-[9px] text-slate-500 block mb-1">الترجمة العربية للسياق:</span>
                                <p id="vanishing-arabic-context" class="text-xs text-slate-300 leading-relaxed font-bold"></p>
                            </div>
                            
                            <!-- The difficulty buttons -->
                            <div class="flex justify-center gap-2 mb-2 flex-wrap">
                                <button onclick="setVanishingLevel(0.2)" class="text-[10px] bg-emerald-900/40 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/30 hover:bg-emerald-800/60 transition">إخفاء 20%</button>
                                <button onclick="setVanishingLevel(0.5)" class="text-[10px] bg-blue-900/40 text-blue-300 px-3 py-1.5 rounded-lg border border-blue-500/30 hover:bg-blue-800/60 transition">إخفاء 50%</button>
                                <button onclick="setVanishingLevel(0.8)" class="text-[10px] bg-amber-900/40 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/30 hover:bg-amber-800/60 transition">إخفاء 80%</button>
                                <button onclick="setVanishingLevel(1.0)" class="text-[10px] bg-red-900/40 text-red-300 px-3 py-1.5 rounded-lg border border-red-500/30 hover:bg-red-800/60 transition">غيابي (100%)</button>
                            </div>

                            <div class="bg-slate-950 p-5 rounded-2xl border border-slate-850 text-left font-serif leading-relaxed text-slate-200 text-sm sm:text-base select-none relative" dir="ltr">
                                <div id="vanishing-text-container" class="leading-loose flex flex-wrap gap-2 items-center"></div>
                            </div>
                            
                            <div class="flex gap-2">
                                <button onclick="checkVanishingAnswer()" class="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition">تحقق من الإجابة</button>
                                <button onclick="revealVanishingHint()" class="bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-4 py-2.5 rounded-xl text-xs transition">💡 مساعدة</button>
                            </div>
                        </div>
                    </div>
                `;
                startVanishingGameSelector();
            } else if (gameType === 'muscle') {
                document.getElementById('game-title-header').innerText = "الذاكرة العضلية (Typing Speed Test)";
                mount.innerHTML = `
                    <div class="space-y-4 text-right max-w-xl mx-auto">
                        <div id="muscle-selector-view" class="space-y-3">
                            <h4 class="text-xs font-bold text-slate-400 mb-2">اختر القطعة لتحدي سرعة الطباعة:</h4>
                            <div class="grid grid-cols-1 gap-2" id="muscle-passage-buttons"></div>
                        </div>
                        
                        <div id="muscle-play-view" class="hidden space-y-4">
                            <div class="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span class="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded font-black" id="muscle-title"></span>
                                <button onclick="exitMuscleToSelector()" class="text-[10px] text-slate-400 hover:text-white transition">🔙 تغيير القطعة</button>
                            </div>
                            
                            <div class="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-850">
                                <span class="text-[9px] text-slate-500 block mb-1">السياق العربي للقطعة:</span>
                                <p id="muscle-arabic-context" class="text-xs text-slate-300 leading-relaxed font-bold"></p>
                            </div>
                            
                            <div class="relative bg-slate-950 p-5 rounded-2xl border border-slate-850 text-left font-serif text-sm sm:text-base h-64 overflow-y-auto cursor-text no-scrollbar" dir="ltr" onclick="document.getElementById('muscle-hidden-input').focus()">
                                <!-- Faint target text -->
                                <div id="muscle-target-text" class="absolute inset-5 text-slate-700 whitespace-pre-wrap break-words pointer-events-none"></div>
                                <!-- User typed text overlay (colored) -->
                                <div id="muscle-typed-overlay" class="absolute inset-5 whitespace-pre-wrap break-words pointer-events-none z-10 text-white font-bold leading-normal"></div>
                                <!-- Hidden input capturing keystrokes -->
                                <textarea id="muscle-hidden-input" class="absolute opacity-0 w-full h-full inset-0 resize-none outline-none" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" oninput="handleMuscleTyping(event)"></textarea>
                            </div>
                            
                            <div id="muscle-feedback" class="hidden p-3 rounded-xl border text-xs leading-relaxed text-center mt-2 font-bold font-mono"></div>
                        </div>
                    </div>
                `;
                startMuscleGameSelector();
            } else if (gameType === 'dictation') {
                document.getElementById('game-title-header').innerText = "تحدي الإملاء الصوتي المخفي (Blind Dictation)";
                mount.innerHTML = `
                    <div class="space-y-4 text-right max-w-xl mx-auto">
                        <div id="dictation-selector-view" class="space-y-3">
                            <h4 class="text-xs font-bold text-slate-400 mb-2">اختر القطعة للإملاء الصوتي:</h4>
                            <div class="grid grid-cols-1 gap-2" id="dictation-passage-buttons"></div>
                        </div>
                        
                        <div id="dictation-play-view" class="hidden space-y-4">
                            <div class="flex justify-between items-center border-b border-slate-800 pb-2">
                                <span class="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded font-black" id="dictation-title"></span>
                                <button onclick="exitDictationToSelector()" class="text-[10px] text-slate-400 hover:text-white transition">🔙 تغيير القطعة</button>
                            </div>
                            
                            <div class="text-center py-6 bg-slate-950/80 rounded-2xl border border-slate-850 space-y-3">
                                <button onclick="playDictationAudio()" class="w-16 h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-full mx-auto flex items-center justify-center shadow-lg shadow-blue-900/50 transition transform active:scale-95 group">
                                    <span class="text-3xl group-hover:scale-110 transition">🔊</span>
                                </button>
                                <p class="text-[10px] text-slate-400">انقر للاستماع للنطق الصحيح (يمكنك التكرار)</p>
                            </div>
                            
                            <textarea id="dictation-input" rows="5" placeholder="اكتب ما تسمعه باللغة الإنجليزية هنا..." class="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-4 text-left text-sm font-serif focus:border-amber-400 focus:outline-none" dir="ltr" spellcheck="false"></textarea>
                            
                            <button onclick="checkDictationAnswer()" class="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl text-xs transition">تسليم الإجابة وتقييمها</button>
                            
                            <div id="dictation-feedback" class="hidden p-3 rounded-xl border text-xs leading-relaxed text-right mt-2"></div>
                        </div>
                    </div>
                `;
                startDictationGameSelector();
            }
        };

        // --- SUB GAME 5: CLOZE PASSAGE MEMORIZATION ---
        function startClozeGameSelector() {
            const container = document.getElementById('cloze-passage-buttons');
            container.innerHTML = '';
            
            Object.keys(definitionsData).forEach(key => {
                const item = definitionsData[key];
                if (state.reviewFilter === 'failures' && !state.failedPassages.some(f => f.title === item.title)) return;
                
                const btn = document.createElement('button');
                btn.className = "w-full p-3.5 bg-slate-950 border border-slate-850 hover:border-amber-500/30 text-right rounded-2xl flex justify-between items-center transition group";
                btn.innerHTML = `
                    <div class="text-right">
                        <h5 class="font-bold text-xs text-slate-200 group-hover:text-amber-400 transition">${item.title}</h5>
                        <p class="text-[9px] text-slate-400 mt-1 truncate max-w-xs">${item.arabic}</p>
                    </div>
                    <span class="text-xs text-amber-500">ابدأ التحدي ⬅</span>
                `;
                btn.onclick = () => selectClozePassage(key);
                container.appendChild(btn);
            });
            
            if (container.children.length === 0) {
                container.innerHTML = `<p class="text-center text-xs text-red-400 py-6 font-bold">لا يوجد تعاريف صعبة مسجلة! ألغِ تفعيل تحدي الصعوبات للعب.</p>`;
            }
        }
        
        let clozeState = {
            key: null,
            answers: {},
            selectedBlankIndex: null,
            shuffledWords: []
        };
        
        function selectClozePassage(key) {
            clozeState.key = key;
            clozeState.answers = {};
            clozeState.selectedBlankIndex = 1;
            
            const def = definitionsData[key];
            document.getElementById('cloze-title').innerText = def.title;
            document.getElementById('cloze-arabic-context').innerText = def.arabic;
            
            const wordsList = def.blanks.map(b => b.word);
            clozeState.shuffledWords = [...wordsList].sort(() => 0.5 - Math.random());
            
            document.getElementById('cloze-selector-view').classList.add('hidden');
            document.getElementById('cloze-play-view').classList.remove('hidden');
            
            renderClozePassage();
            renderClozeWordsBank();
        }
        
        function exitClozeToSelector() {
            document.getElementById('cloze-selector-view').classList.remove('hidden');
            document.getElementById('cloze-play-view').classList.add('hidden');
            startClozeGameSelector();
        }
        
        function renderClozePassage() {
            const def = definitionsData[clozeState.key];
            const container = document.getElementById('cloze-passage-container');
            
            let text = def.passage;
            
            def.blanks.forEach(b => {
                const blankIndex = b.index;
                const placedWord = clozeState.answers[blankIndex] || ` [ الفراغ ${blankIndex} ] `;
                const isSelected = clozeState.selectedBlankIndex === blankIndex;
                const isFilled = !!clozeState.answers[blankIndex];
                
                const cssClass = isSelected 
                    ? "px-2 py-0.5 mx-1 font-sans rounded-lg border-2 border-amber-500 bg-amber-500/10 text-amber-400 font-bold" 
                    : isFilled 
                        ? "px-2 py-0.5 mx-1 font-sans rounded-lg border border-amber-500/40 bg-slate-900 text-amber-300 font-bold font-serif"
                        : "px-2 py-0.5 mx-1 font-sans rounded-lg border border-slate-800 bg-slate-950 text-slate-500 font-bold text-xs";
                
                const blankHtml = `<button onclick="selectClozeBlank(${blankIndex})" class="${cssClass}">${placedWord}</button>`;
                text = text.replace(`{${b.word}}`, blankHtml);
            });
            
            container.innerHTML = text;
        }
        
        function selectClozeBlank(index) {
            clozeState.selectedBlankIndex = index;
            renderClozePassage();
        }
        
        function renderClozeWordsBank() {
            const container = document.getElementById('cloze-words-bank');
            container.innerHTML = '';
            
            clozeState.shuffledWords.forEach(word => {
                const isPlaced = Object.values(clozeState.answers).includes(word);
                
                const btn = document.createElement('button');
                btn.className = `px-3 py-1.5 rounded-xl text-xs font-bold font-serif transition ${
                    isPlaced 
                        ? 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed opacity-40' 
                        : 'bg-slate-950 border border-slate-850 text-slate-300 hover:border-amber-500/40 hover:text-amber-300'
                }`;
                btn.innerText = word;
                btn.disabled = isPlaced;
                btn.onclick = () => placeWordInClozeBlank(word);
                container.appendChild(btn);
            });
        }
        
        function placeWordInClozeBlank(word) {
            if (clozeState.selectedBlankIndex === null) {
                showToast("يرجى اختيار فراغ أولاً بالضغط عليه.", false);
                return;
            }
            
            const blankIndex = clozeState.selectedBlankIndex;
            clozeState.answers[blankIndex] = word;
            
            const def = definitionsData[clozeState.key];
            const nextEmptyBlank = def.blanks.find(b => !clozeState.answers[b.index]);
            clozeState.selectedBlankIndex = nextEmptyBlank ? nextEmptyBlank.index : null;
            
            renderClozePassage();
            renderClozeWordsBank();
        }
        
        function resetClozeGame() {
            clozeState.answers = {};
            clozeState.selectedBlankIndex = 1;
            renderClozePassage();
            renderClozeWordsBank();
        }
        
        function nextClozePassage() {
            const keys = Object.keys(definitionsData).filter(key => {
                const item = definitionsData[key];
                if (state.reviewFilter === 'failures' && !state.failedPassages.some(f => f.title === item.title)) return false;
                return true;
            });
            const currentIndex = keys.indexOf(clozeState.key);
            if (currentIndex >= 0 && currentIndex < keys.length - 1) {
                selectClozePassage(keys[currentIndex + 1]);
            } else {
                showToast("لقد وصلت إلى نهاية القطع المتاحة.", true);
            }
        }
        
        function prevClozePassage() {
            const keys = Object.keys(definitionsData).filter(key => {
                const item = definitionsData[key];
                if (state.reviewFilter === 'failures' && !state.failedPassages.some(f => f.title === item.title)) return false;
                return true;
            });
            const currentIndex = keys.indexOf(clozeState.key);
            if (currentIndex > 0) {
                selectClozePassage(keys[currentIndex - 1]);
            } else {
                showToast("هذه هي القطعة الأولى.", true);
            }
        }
        
        function checkClozeAnswer() {
            const def = definitionsData[clozeState.key];
            
            const unfilled = def.blanks.find(b => !clozeState.answers[b.index]);
            if (unfilled) {
                showToast("يرجى ملء جميع الفراغات قبل التحقق.", false);
                return;
            }
            
            let correctCount = 0;
            const container = document.getElementById('cloze-passage-container');
            
            let text = def.passage;
            def.blanks.forEach(b => {
                const blankIndex = b.index;
                const placed = clozeState.answers[blankIndex];
                const actual = b.word;
                const isCorrect = placed === actual;
                
                if (isCorrect) correctCount++;
                
                const cssClass = isCorrect 
                    ? "px-2 py-0.5 mx-1 font-sans rounded-lg border-2 border-emerald-500 bg-emerald-950 text-emerald-300 font-bold font-serif" 
                    : "px-2 py-0.5 mx-1 font-sans rounded-lg border-2 border-red-500 bg-red-950 text-red-355 font-bold font-serif";
                
                const blankHtml = `<span class="${cssClass}">${placed}</span>`;
                text = text.replace(`{${b.word}}`, blankHtml);
            });
            
            container.innerHTML = text;
            
            const total = def.blanks.length;
            const percent = Math.round((correctCount / total) * 100);
            
            if (percent === 100) {
                state.score += 50;
                updateDashboardStats();
                incrementCompletedExercises();
                showToast(`أداء مذهل ومطابقة حرفية 100% للتعريف القانوني! +50 نقطة`, true);
            } else {
                addPassageMistake(def);
                showToast(`أحسنت محاولة الحفظ. إجاباتك الصحيحة: ${correctCount} من أصل ${total}. يرجى المراجعة وإعادة المحاولة.`, false);
            }
        }

        // --- SUB GAME 6: REORDER PASSAGE ---
        function startReorderGameSelector() {
            const container = document.getElementById('reorder-passage-buttons');
            container.innerHTML = '';
            
            passagesData.forEach((item, index) => {
                if (state.reviewFilter === 'failures' && !state.failedPassages.some(f => f.title === item.title)) return;
                
                const btn = document.createElement('button');
                btn.className = "w-full p-3.5 bg-slate-950 border border-slate-850 hover:border-amber-500/30 text-right rounded-2xl flex justify-between items-center transition group";
                btn.innerHTML = `
                    <div class="text-right">
                        <h5 class="font-bold text-xs text-slate-200 group-hover:text-amber-400 transition">${item.title}</h5>
                        <p class="text-[9px] text-slate-400 mt-1 truncate max-w-xs">${item.arabic}</p>
                    </div>
                    <span class="text-xs text-amber-500">ابدأ التحدي ⬅</span>
                `;
                btn.onclick = () => selectReorderPassage(index);
                container.appendChild(btn);
            });
            
            if (container.children.length === 0) {
                container.innerHTML = `<p class="text-center text-xs text-red-400 py-6 font-bold">لا يوجد قطع صعبة مسجلة! ألغِ تفعيل تحدي الصعوبات للعب.</p>`;
            }
        }
        
        let reorderState = {
            index: null,
            chunks: [],
            constructed: [],
            correctOrder: []
        };
        
        function selectReorderPassage(index) {
            reorderState.index = index;
            reorderState.constructed = [];
            
            const def = passagesData[index];
            document.getElementById('reorder-title').innerText = def.title;
            document.getElementById('reorder-arabic-context').innerText = def.arabic;
            
            const words = def.english.split(' ');
            let chunks = [];
            let currentChunk = [];
            words.forEach(w => {
                currentChunk.push(w);
                if (currentChunk.length >= 2 || w.includes(',') || w.includes('.')) {
                    chunks.push(currentChunk.join(' '));
                    currentChunk = [];
                }
            });
            if (currentChunk.length > 0) chunks.push(currentChunk.join(' '));
            
            reorderState.correctOrder = [...chunks];
            reorderState.chunks = chunks.sort(() => 0.5 - Math.random());
            
            document.getElementById('reorder-selector-view').classList.add('hidden');
            document.getElementById('reorder-play-view').classList.remove('hidden');
            
            renderReorderPlayground();
        }
        
        function renderReorderPlayground() {
            const constructedContainer = document.getElementById('reorder-constructed-container');
            const bankContainer = document.getElementById('reorder-chunks-bank');
            
            constructedContainer.innerHTML = reorderState.constructed.map(c => `<span class="inline-block px-1.5 py-0.5 m-1 bg-slate-900 border border-amber-500/30 text-amber-300 rounded-lg cursor-pointer hover:bg-slate-800 transition shadow-sm">${c}</span>`).join(' ');
            
            bankContainer.innerHTML = '';
            
            let usedIndexes = reorderState.constructedIndexes || [];
            
            reorderState.chunks.forEach((chunk, i) => {
                if (!usedIndexes.includes(i)) {
                    const btn = document.createElement('button');
                    btn.className = 'px-3 py-1.5 m-1 rounded-xl text-xs font-bold font-serif transition bg-slate-950 border border-slate-850 text-slate-300 hover:border-amber-500/40 hover:text-amber-300 shadow-sm text-left leading-relaxed';
                    btn.innerText = chunk;
                    btn.onclick = () => {
                        if (!reorderState.constructedIndexes) reorderState.constructedIndexes = [];
                        reorderState.constructedIndexes.push(i);
                        reorderState.constructed.push(chunk);
                        renderReorderPlayground();
                    };
                    bankContainer.appendChild(btn);
                }
            });
        }
        
        function undoReorderChunk() {
            if (reorderState.constructed.length > 0) {
                reorderState.constructed.pop();
                reorderState.constructedIndexes.pop();
                renderReorderPlayground();
            }
        }
        
        function checkReorderAnswer() {
            const current = reorderState.constructed.join(' ').trim();
            const correct = reorderState.correctOrder.join(' ').trim();
            if (current === correct && reorderState.constructed.length === reorderState.correctOrder.length) {
                showToast("ممتاز! ترتيب القطعة صحيح 100%.", true);
                if (typeof triggerConfetti === "function") triggerConfetti();
                state.score += 20;
                updateDashboardStats();
                incrementCompletedExercises();
            } else if (reorderState.constructed.length < reorderState.correctOrder.length) {
                showToast("الرجاء إكمال ترتيب جميع الأجزاء المتاحة أولاً.", false);
            } else {
                addPassageMistake(passagesData[reorderState.index]);
                showToast("يوجد خطأ في الترتيب، قم بالتراجع عن بعض الخطوات وحاول مرة أخرى.", false);
            }
        }
        
        function resetReorderGame() {
            if (reorderState.index !== null) {
                reorderState.constructedIndexes = [];
                selectReorderPassage(reorderState.index);
            }
        }
        
        function getAvailableReorderIndices() {
            let available = [];
            passagesData.forEach((item, index) => {
                if (state.reviewFilter === 'failures' && !state.failedPassages.some(f => f.title === item.title)) return;
                available.push(index);
            });
            return available;
        }

        function nextReorderPassage() {
            const indices = getAvailableReorderIndices();
            const currentIndex = indices.indexOf(reorderState.index);
            if (currentIndex >= 0 && currentIndex < indices.length - 1) {
                selectReorderPassage(indices[currentIndex + 1]);
            } else {
                showToast("لقد وصلت إلى نهاية القطع المتاحة.", true);
            }
        }

        function prevReorderPassage() {
            const indices = getAvailableReorderIndices();
            const currentIndex = indices.indexOf(reorderState.index);
            if (currentIndex > 0) {
                selectReorderPassage(indices[currentIndex - 1]);
            } else {
                showToast("هذه هي القطعة الأولى.", true);
            }
        }
        
        function exitReorderToSelector() {
            document.getElementById('reorder-selector-view').classList.remove('hidden');
            document.getElementById('reorder-play-view').classList.add('hidden');
            reorderState.constructedIndexes = [];
            startReorderGameSelector();
        }
        // --- SUB GAME 7: PASSAGE SPELLING ---
        function startPSpellGameSelector() {
            const container = document.getElementById('pspell-passage-buttons');
            container.innerHTML = '';
            passagesData.forEach((item, index) => {
                if (state.reviewFilter === 'failures' && !state.failedPassages.some(f => f.title === item.title)) return;
                
                const btn = document.createElement('button');
                btn.className = "w-full p-3.5 bg-slate-950 border border-slate-850 hover:border-amber-500/30 text-right rounded-2xl flex justify-between items-center transition group";
                btn.innerHTML = `
                    <div class="text-right">
                        <h5 class="font-bold text-xs text-slate-200 group-hover:text-amber-400 transition">${item.title}</h5>
                        <p class="text-[9px] text-slate-400 mt-1 truncate max-w-xs">${item.arabic}</p>
                    </div>
                    <span class="text-xs text-amber-500">تسميع ⬅</span>
                `;
                btn.onclick = () => selectPSpellPassage(index);
                container.appendChild(btn);
            });
            
            if (container.children.length === 0) {
                container.innerHTML = `<p class="text-center text-xs text-red-400 py-6 font-bold">لا يوجد قطع صعبة مسجلة! ألغِ تفعيل تحدي الصعوبات للعب.</p>`;
            }
        }
        
        let pspellState = {
            index: null,
            english: ""
        };
        
        function selectPSpellPassage(index) {
            pspellState.index = index;
            const def = passagesData[index];
            pspellState.english = def.english;
            
            document.getElementById('pspell-title').innerText = def.title;
            document.getElementById('pspell-arabic-context').innerText = def.arabic;
            document.getElementById('pspell-input').value = '';
            document.getElementById('pspell-feedback').classList.add('hidden');
            
            document.getElementById('pspell-selector-view').classList.add('hidden');
            document.getElementById('pspell-play-view').classList.remove('hidden');
        }
        
        function checkPSpellAnswer() {
            const input = document.getElementById('pspell-input').value;
            const normalize = (text) => text.toLowerCase().replace(/[.,!?;:"'()]/g, '').replace(/\s+/g, ' ').trim();
            
            const normalizedInput = normalize(input);
            const normalizedTarget = normalize(pspellState.english);
            
            const feedbackBox = document.getElementById('pspell-feedback');
            feedbackBox.classList.remove('hidden', 'border-emerald-500', 'bg-emerald-950/50', 'text-emerald-300', 'border-red-500', 'bg-red-950/50', 'text-red-300', 'border-amber-500', 'bg-amber-950/50', 'text-amber-300');
            
            if (normalizedInput === normalizedTarget && normalizedInput.length > 0) {
                showToast("ممتاز! التسميع صحيح 100%.", true);
                if (typeof triggerConfetti === "function") triggerConfetti();
                state.score += 30;
                updateDashboardStats();
                incrementCompletedExercises();
                
                feedbackBox.classList.add('border-emerald-500', 'bg-emerald-950/50', 'text-emerald-300');
                feedbackBox.innerHTML = `<b>أحسنت! إجابة مثالية:</b><br><span dir="ltr" class="font-serif block mt-1">${pspellState.english}</span>`;
            } else {
                addPassageMistake(passagesData[pspellState.index]);
                feedbackBox.classList.add('border-red-500', 'bg-red-950/50', 'text-red-300');
                feedbackBox.innerHTML = `<b>يوجد خطأ في الإملاء.</b> حاول المراجعة والتصحيح. إذا كنت بحاجة للمساعدة، استخدم زر التلميح.`;
            }
        }
        
        function revealPSpellHint() {
            const feedbackBox = document.getElementById('pspell-feedback');
            feedbackBox.classList.remove('hidden', 'border-emerald-500', 'bg-emerald-950/50', 'text-emerald-300', 'border-red-500', 'bg-red-950/50', 'text-red-300', 'border-amber-500', 'bg-amber-950/50', 'text-amber-300');
            feedbackBox.classList.add('border-amber-500', 'bg-amber-950/50', 'text-amber-300');
            
            const words = pspellState.english.split(' ');
            const hintLength = Math.max(3, Math.floor(words.length / 2));
            const hintText = words.slice(0, hintLength).join(' ') + ' ...';
            
            feedbackBox.innerHTML = `<b>تلميح:</b> يبدأ النص بـ<br><span dir="ltr" class="font-serif block mt-1">${hintText}</span>`;
            state.score = Math.max(0, state.score - 5);
            updateDashboardStats();
        }
        
        function exitPSpellToSelector() {
            document.getElementById('pspell-selector-view').classList.remove('hidden');
            document.getElementById('pspell-play-view').classList.add('hidden');
            startPSpellGameSelector();
        }

        function closeCurrentGame() {
            if (state.matchTimerInterval) clearInterval(state.matchTimerInterval);
            document.getElementById('games-selection-hub').classList.remove('hidden');
            document.getElementById('game-playground-container').classList.add('hidden');
        }

        // --- SUB GAME 1: FLASHCARDS ENGINE ---
        function flipActiveCard() {
            document.getElementById('active-card').classList.toggle('flipped');
        }

        function renderPlaycard() {
            const currentItem = state.activeFlashcards[state.flashcardIndex];
            document.getElementById('active-card').classList.remove('flipped');

            document.getElementById('g-card-ar').innerText = currentItem.arabic;
            document.getElementById('g-card-en').innerText = currentItem.english;
            document.getElementById('g-card-cat').innerText = `الفئة: ${currentItem.category}`;

            const total = state.activeFlashcards.length;
            document.getElementById('g-card-progress').innerText = `البطاقة ${state.flashcardIndex + 1} من ${total}`;
        }

        function answerFlashcard(mastered) {
            const currentItem = state.activeFlashcards[state.flashcardIndex];
            if (mastered) {
                state.score += 10;
                showToast("ممتاز! استمر في الحفظ.");
            } else {
                addMistake(currentItem);
                showToast("تم إضافتها لقائمة التحدي والصعوبات بالرئيسية.");
            }
            updateDashboardStats();

            if (state.flashcardIndex < state.activeFlashcards.length - 1) {
                state.flashcardIndex++;
                renderPlaycard();
            } else {
                showToast("أنهيت كامل البطاقات التسميعية بنجاح!", true);
                closeCurrentGame();
            }
        }

        function skipFlashcard() {
            if (state.flashcardIndex < state.activeFlashcards.length - 1) {
                state.flashcardIndex++;
                renderPlaycard();
            } else {
                showToast("لقد أنهيت جميع البطاقات المتاحة!", true);
                closeCurrentGame();
            }
        }

        // --- SUB GAME 2: MATCHING ---
        function initPlaygroundMatch() {
            const smartTerms = getSmartTermsList();
            const count = Math.min(4, smartTerms.length);
            const selected = smartTerms.slice(0, count);

            let items = [];
            selected.forEach(t => {
                items.push({ id: t.id, text: t.arabic, lang: 'ar' });
                items.push({ id: t.id, text: t.english, lang: 'en' });
            });

            items.sort(() => 0.5 - Math.random());
            state.matchPairs = items;
            state.matchSelectedId = null;

            // Timer
            let matchSecs = 0;
            if (state.matchTimerInterval) clearInterval(state.matchTimerInterval);
            state.matchTimerInterval = setInterval(() => {
                matchSecs++;
                const mins = String(Math.floor(matchSecs / 60)).padStart(2, '0');
                const secs = String(matchSecs % 60).padStart(2, '0');
                document.getElementById('match-timer-label').innerText = `⏱️ المؤقت: ${mins}:${secs}`;
            }, 1000);

            renderPlaygroundMatchGrid();
        }

        function renderPlaygroundMatchGrid() {
            const grid = document.getElementById('playground-match-grid');
            grid.innerHTML = '';

            state.matchPairs.forEach((pair, idx) => {
                const btn = document.createElement('button');
                btn.id = `g-match-${idx}`;
                btn.className = `p-3 h-16 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center text-center transition ${
                    pair.lang === 'en' ? 'english-text bg-slate-950 border-amber-500/30 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-100'
                }`;
                btn.innerText = pair.text;
                btn.onclick = () => selectPlaygroundMatchCard(idx);
                grid.appendChild(btn);
            });
        }

        function selectPlaygroundMatchCard(idx) {
            const card = state.matchPairs[idx];
            if (!card || card.matched) return;

            if (state.matchSelectedId === null) {
                state.matchSelectedId = idx;
                document.getElementById(`g-match-${idx}`).classList.add('border-amber-500', 'bg-amber-500/10');
            } else {
                if (state.matchSelectedId === idx) {
                    document.getElementById(`g-match-${idx}`).classList.remove('border-amber-500', 'bg-amber-500/10');
                    state.matchSelectedId = null;
                    return;
                }

                const prevIdx = state.matchSelectedId;
                const prevCard = state.matchPairs[prevIdx];

                if (prevCard.id === card.id && prevCard.lang !== card.lang) {
                    // Success Match
                    document.getElementById(`g-match-${prevIdx}`).className = "p-3 h-16 rounded-xl border-2 border-emerald-500 bg-emerald-950/60 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center text-center opacity-40 scale-95 transition-all duration-300";
                    document.getElementById(`g-match-${idx}`).className = "p-3 h-16 rounded-xl border-2 border-emerald-500 bg-emerald-950/60 text-emerald-300 font-bold text-xs sm:text-sm flex items-center justify-center text-center opacity-40 scale-95 transition-all duration-300";
                    
                    state.matchPairs[prevIdx].matched = true;
                    state.matchPairs[idx].matched = true;

                    state.score += 15;
                    updateDashboardStats();

                    const allMatched = state.matchPairs.every(p => p.matched);
                    if (allMatched) {
                        clearInterval(state.matchTimerInterval);
                        showToast(`أداء خارق ومطابقة سليمة وممتازة يا دكتور!`, true);
                        setTimeout(() => closeCurrentGame(), 1500);
                    }
                } else {
                    // Error Match
                    const card1 = document.getElementById(`g-match-${prevIdx}`);
                    const card2 = document.getElementById(`g-match-${idx}`);
                    
                    card1.className = "p-3 h-16 rounded-xl border-2 border-red-500 bg-red-950 text-red-200 font-bold text-xs sm:text-sm flex items-center justify-center text-center transition-all duration-200";
                    card2.className = "p-3 h-16 rounded-xl border-2 border-red-500 bg-red-950 text-red-200 font-bold text-xs sm:text-sm flex items-center justify-center text-center transition-all duration-200";
                    
                    // Add mistake
                    const fullTerm = glossaryData.find(t => t.id === card.id);
                    if (fullTerm) addMistake(fullTerm);

                    setTimeout(() => {
                        const pCard = state.matchPairs[prevIdx];
                        const cCard = state.matchPairs[idx];
                        
                        card1.className = `p-3 h-16 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center text-center transition-all duration-200 ${
                            pCard.lang === 'en' ? 'english-text bg-slate-950 border-amber-500/30 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-100'
                        }`;
                        card2.className = `p-3 h-16 rounded-xl border font-bold text-xs sm:text-sm flex items-center justify-center text-center transition-all duration-200 ${
                            cCard.lang === 'en' ? 'english-text bg-slate-950 border-amber-500/30 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-100'
                        }`;
                    }, 800);
                }
                state.matchSelectedId = null;
            }
        }

        // --- SUB GAME 3: SPELLING ---
        function renderPlaygroundSpelling() {
            const currentItem = state.writingTerms[state.writingCurrentIndex];
            document.getElementById('g-spell-ar').innerText = currentItem.arabic;
            document.getElementById('g-spell-input').value = '';
            document.getElementById('g-spell-hint-lbl').innerText = '';
        }

        function checkPlaygroundSpelling() {
            const currentItem = state.writingTerms[state.writingCurrentIndex];
            const val = document.getElementById('g-spell-input').value.trim().toLowerCase();
            const correct = currentItem.english.trim().toLowerCase();

            if (val === correct) {
                state.score += 20;
                updateDashboardStats();
                showToast("إملاء رائع وصحيح مئة بالمئة!", true);
                nextPlaygroundSpelling();
            } else {
                addMistake(currentItem);
                showToast(`خطأ! الإملاء الدقيق: ${currentItem.english}`, false);
            }
        }

        function revealSpellHint() {
            const currentItem = state.writingTerms[state.writingCurrentIndex];
            const text = currentItem.english;
            let mask = "";
            for (let i = 0; i < text.length; i++) {
                if (i === 0 || text[i-1] === ' ' || text[i] === ' ') {
                    mask += text[i];
                } else {
                    mask += "_";
                }
            }
            document.getElementById('g-spell-hint-lbl').innerText = mask;
        }

        function nextPlaygroundSpelling() {
            if (state.writingCurrentIndex < state.writingTerms.length - 1) {
                state.writingCurrentIndex++;
                renderPlaygroundSpelling();
            } else {
                showToast("أتممت تحدي الكتابة والإملاء بنجاح!", true);
                closeCurrentGame();
            }
        }

        // --- SUB GAME 4: MCQ QUIZ ENGINE ---
        function renderPlaygroundQuizQuestion() {
            const currentQ = state.quizQuestions[state.quizCurrentIndex];
            document.getElementById('g-quiz-progress-text').innerText = `سؤال ${state.quizCurrentIndex + 1} من ${state.quizQuestions.length}`;
            document.getElementById('g-quiz-score-text').innerText = `النقاط المكتسبة: ${state.quizScore * 10}`;
            document.getElementById('g-quiz-question-lbl').innerText = currentQ.question;
            
            document.getElementById('g-quiz-feedback-box').classList.add('hidden');

            const container = document.getElementById('g-quiz-answers-box');
            container.innerHTML = '';

            currentQ.answers.forEach(ans => {
                const btn = document.createElement('button');
                btn.className = "quiz-sub-choice w-full p-3.5 bg-slate-950 border border-slate-800 text-slate-100 font-bold rounded-2xl text-right text-xs hover:border-amber-500 transition";
                btn.innerText = ans;
                btn.onclick = () => submitPlaygroundQuizAnswer(ans, btn);
                container.appendChild(btn);
            });
        }

        function submitPlaygroundQuizAnswer(selectedAns, btnElement) {
            const currentQ = state.quizQuestions[state.quizCurrentIndex];
            
            // Lock inputs
            const btns = document.querySelectorAll('.quiz-sub-choice');
            btns.forEach(b => b.disabled = true);

            const isCorrect = selectedAns === currentQ.correctAnswer;
            const fbBox = document.getElementById('g-quiz-feedback-box');
            fbBox.classList.remove('hidden');

            if (isCorrect) {
                state.quizScore++;
                state.score += 15;
                updateDashboardStats();
                btnElement.className = "quiz-sub-choice w-full p-3.5 bg-emerald-950 border-2 border-emerald-500 text-emerald-300 font-bold rounded-2xl text-right text-xs";
                
                fbBox.className = "p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 text-xs mt-3 text-right";
                fbBox.innerText = `رائع د. ${state.userName}! المطابقة صحيحة بالكامل.`;
            } else {
                addMistake(currentQ.termReference);
                btnElement.className = "quiz-sub-choice w-full p-3.5 bg-red-950 border-2 border-red-500 text-red-200 font-bold rounded-2xl text-right text-xs";
                
                // Outline correct
                btns.forEach(b => {
                    if (b.innerText === currentQ.correctAnswer) {
                        b.className = "quiz-sub-choice w-full p-3.5 bg-slate-950 border-2 border-emerald-500 text-emerald-400 font-bold rounded-2xl text-right text-xs";
                    }
                });

                fbBox.className = "p-3 rounded-xl border border-red-500/30 bg-red-950/20 text-red-300 text-xs mt-3 text-right";
                fbBox.innerText = `إجابة خاطئة! الجواب الصحيح هو: [ ${currentQ.correctAnswer} ] - تمت إضافة المصطلح للكلمات الأكثر صعوبة لترسيخه لاحقاً.`;
            }

            // Next button or finish
            setTimeout(() => {
                if (state.quizCurrentIndex < state.quizQuestions.length - 1) {
                    state.quizCurrentIndex++;
                    renderPlaygroundQuizQuestion();
                } else {
                    showToast(`أنهيت الاختبار بنجاح بمعدل ${state.quizScore}/${state.quizQuestions.length}`, true);
                    closeCurrentGame();
                }
            }, 2500);
        }


        // --- SUB GAME 8: VANISHING TEXT ---
        let vanishingState = {
            index: null,
            english: "",
            level: 0.2 // 20%
        };

        function startVanishingGameSelector() {
            const container = document.getElementById('vanishing-passage-buttons');
            container.innerHTML = '';
            passagesData.forEach((item, index) => {
                if (state.reviewFilter === 'failures' && !state.failedPassages.some(f => f.title === item.title)) return;
                const btn = document.createElement('button');
                btn.className = "w-full p-3.5 bg-slate-950 border border-slate-850 hover:border-amber-500/30 text-right rounded-2xl flex justify-between items-center transition group";
                btn.innerHTML = `
                    <div class="text-right">
                        <h5 class="font-bold text-xs text-slate-200 group-hover:text-amber-400 transition">${item.title}</h5>
                        <p class="text-[9px] text-slate-400 mt-1 truncate max-w-xs">${item.arabic}</p>
                    </div>
                    <span class="text-xs text-amber-500">ابدأ التحدي ⬅</span>
                `;
                btn.onclick = () => selectVanishingPassage(index);
                container.appendChild(btn);
            });
            if (container.children.length === 0) {
                container.innerHTML = `<p class="text-center text-xs text-red-400 py-6 font-bold">لا يوجد قطع صعبة مسجلة!</p>`;
            }
        }

        function selectVanishingPassage(index) {
            vanishingState.index = index;
            const def = passagesData[index];
            vanishingState.english = def.english;
            
            document.getElementById('vanishing-title').innerText = def.title;
            document.getElementById('vanishing-arabic-context').innerText = def.arabic;
            document.getElementById('vanishing-selector-view').classList.add('hidden');
            document.getElementById('vanishing-play-view').classList.remove('hidden');
            
            setVanishingLevel(0.2);
        }

        function setVanishingLevel(level) {
            vanishingState.level = level;
            const container = document.getElementById('vanishing-text-container');
            container.innerHTML = '';
            
            const words = vanishingState.english.split(' ');
            words.forEach((w, idx) => {
                const shouldHide = Math.random() < level;
                if (shouldHide) {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.dataset.word = w.replace(/[.,!?;:"'()]/g, '');
                    input.dataset.original = w;
                    input.className = "vanishing-blank bg-slate-900 border-b-2 border-slate-700 text-amber-400 focus:border-amber-400 focus:outline-none text-center px-1 font-serif";
                    input.style.width = `${Math.max(w.length * 10, 40)}px`;
                    container.appendChild(input);
                } else {
                    const span = document.createElement('span');
                    span.innerText = w;
                    span.className = "text-slate-400";
                    container.appendChild(span);
                }
            });
        }

        function checkVanishingAnswer() {
            const inputs = document.querySelectorAll('.vanishing-blank');
            let correct = 0;
            inputs.forEach(input => {
                const target = input.dataset.word.toLowerCase();
                const val = input.value.trim().toLowerCase().replace(/[.,!?;:"'()]/g, '');
                if (val === target) {
                    input.classList.replace('border-slate-700', 'border-emerald-500');
                    input.classList.add('text-emerald-400');
                    correct++;
                } else {
                    input.classList.replace('border-slate-700', 'border-red-500');
                    input.classList.add('text-red-400');
                }
            });
            
            if (correct === inputs.length && inputs.length > 0) {
                showToast(`ممتاز! تذكرت كل الكلمات المفقودة بدقة. +30 نقطة`, true);
                if (typeof triggerConfetti === "function") triggerConfetti();
                state.score += 30;
                updateDashboardStats();
                incrementCompletedExercises();
            } else {
                addPassageMistake(passagesData[vanishingState.index]);
                showToast(`إجابات صحيحة: ${correct} من ${inputs.length}. حاول مجدداً!`, false);
            }
        }
        
        function revealVanishingHint() {
            const inputs = document.querySelectorAll('.vanishing-blank');
            inputs.forEach(input => {
                if (input.value.trim().toLowerCase() !== input.dataset.word.toLowerCase()) {
                    input.value = input.dataset.original;
                    input.classList.add('text-amber-500', 'opacity-70');
                }
            });
        }

        function exitVanishingToSelector() {
            document.getElementById('vanishing-selector-view').classList.remove('hidden');
            document.getElementById('vanishing-play-view').classList.add('hidden');
            startVanishingGameSelector();
        }

        // --- SUB GAME 9: MUSCLE MEMORY ---
        let muscleState = {
            index: null,
            targetText: ""
        };

        function startMuscleGameSelector() {
            const container = document.getElementById('muscle-passage-buttons');
            container.innerHTML = '';
            passagesData.forEach((item, index) => {
                if (state.reviewFilter === 'failures' && !state.failedPassages.some(f => f.title === item.title)) return;
                const btn = document.createElement('button');
                btn.className = "w-full p-3.5 bg-slate-950 border border-slate-850 hover:border-amber-500/30 text-right rounded-2xl flex justify-between items-center transition group";
                btn.innerHTML = `
                    <div class="text-right">
                        <h5 class="font-bold text-xs text-slate-200 group-hover:text-amber-400 transition">${item.title}</h5>
                        <p class="text-[9px] text-slate-400 mt-1 truncate max-w-xs">${item.arabic}</p>
                    </div>
                    <span class="text-xs text-amber-500">ابدأ التحدي ⬅</span>
                `;
                btn.onclick = () => selectMusclePassage(index);
                container.appendChild(btn);
            });
            if (container.children.length === 0) {
                container.innerHTML = `<p class="text-center text-xs text-red-400 py-6 font-bold">لا يوجد قطع صعبة مسجلة!</p>`;
            }
        }

        function selectMusclePassage(index) {
            muscleState.index = index;
            const def = passagesData[index];
            muscleState.targetText = def.english.trim();
            
            document.getElementById('muscle-title').innerText = def.title;
            document.getElementById('muscle-arabic-context').innerText = def.arabic;
            
            document.getElementById('muscle-target-text').innerText = muscleState.targetText;
            document.getElementById('muscle-typed-overlay').innerHTML = '';
            document.getElementById('muscle-hidden-input').value = '';
            document.getElementById('muscle-feedback').classList.add('hidden');
            
            document.getElementById('muscle-selector-view').classList.add('hidden');
            document.getElementById('muscle-play-view').classList.remove('hidden');
            
            setTimeout(() => document.getElementById('muscle-hidden-input').focus(), 100);
        }

        function handleMuscleTyping(event) {
            const typed = event.target.value;
            const target = muscleState.targetText;
            
            let html = '';
            let isPerfect = true;
            
            for (let i = 0; i < typed.length; i++) {
                if (typed[i] === target[i]) {
                    html += `<span class="text-emerald-400">${typed[i]}</span>`;
                } else {
                    html += `<span class="text-red-500 bg-red-950/50">${target[i] === ' ' ? '_' : target[i]}</span>`;
                    isPerfect = false;
                }
            }
            
            document.getElementById('muscle-typed-overlay').innerHTML = html;
            
            if (typed.length >= target.length) {
                const fb = document.getElementById('muscle-feedback');
                fb.classList.remove('hidden', 'border-emerald-500', 'text-emerald-400', 'border-red-500', 'text-red-400');
                if (isPerfect) {
                    fb.classList.add('border-emerald-500', 'text-emerald-400');
                    fb.innerText = "رائع! ذاكرة عضلية مثالية. +30 نقطة";
                    if (typeof triggerConfetti === "function") triggerConfetti();
                    state.score += 30;
                    updateDashboardStats();
                    incrementCompletedExercises();
                } else {
                    addPassageMistake(passagesData[muscleState.index]);
                    fb.classList.add('border-red-500', 'text-red-400');
                    fb.innerText = "يوجد أخطاء في الطباعة. مسافات أو حروف خاطئة. راجع الألوان الحمراء وصححها (Backspace).";
                }
            }
        }
        
        function exitMuscleToSelector() {
            document.getElementById('muscle-selector-view').classList.remove('hidden');
            document.getElementById('muscle-play-view').classList.add('hidden');
            startMuscleGameSelector();
        }

        // --- SUB GAME 10: BLIND DICTATION ---
        let dictationState = {
            index: null,
            english: ""
        };

        function startDictationGameSelector() {
            const container = document.getElementById('dictation-passage-buttons');
            container.innerHTML = '';
            passagesData.forEach((item, index) => {
                if (state.reviewFilter === 'failures' && !state.failedPassages.some(f => f.title === item.title)) return;
                const btn = document.createElement('button');
                btn.className = "w-full p-3.5 bg-slate-950 border border-slate-850 hover:border-amber-500/30 text-right rounded-2xl flex justify-between items-center transition group";
                btn.innerHTML = `
                    <div class="text-right">
                        <h5 class="font-bold text-xs text-slate-200 group-hover:text-amber-400 transition">${item.title}</h5>
                        <p class="text-[9px] text-slate-400 mt-1 truncate max-w-xs">${item.arabic}</p>
                    </div>
                    <span class="text-xs text-amber-500">ابدأ التحدي ⬅</span>
                `;
                btn.onclick = () => selectDictationPassage(index);
                container.appendChild(btn);
            });
            if (container.children.length === 0) {
                container.innerHTML = `<p class="text-center text-xs text-red-400 py-6 font-bold">لا يوجد قطع صعبة مسجلة!</p>`;
            }
        }

        function selectDictationPassage(index) {
            dictationState.index = index;
            const def = passagesData[index];
            dictationState.english = def.english;
            
            document.getElementById('dictation-title').innerText = def.title;
            document.getElementById('dictation-input').value = '';
            document.getElementById('dictation-feedback').classList.add('hidden');
            
            document.getElementById('dictation-selector-view').classList.add('hidden');
            document.getElementById('dictation-play-view').classList.remove('hidden');
            
            playDictationAudio();
        }

        function playDictationAudio() {
            playGoogleTTS(dictationState.english);
        }

        function checkDictationAnswer() {
            const input = document.getElementById('dictation-input').value;
            const normalize = (text) => text.toLowerCase().replace(/[.,!?;:"'()]/g, '').replace(/\s+/g, ' ').trim();
            
            const normalizedInput = normalize(input);
            const normalizedTarget = normalize(dictationState.english);
            
            const fb = document.getElementById('dictation-feedback');
            fb.classList.remove('hidden', 'border-emerald-500', 'bg-emerald-950/50', 'text-emerald-300', 'border-red-500', 'bg-red-950/50', 'text-red-300');
            
            if (normalizedInput === normalizedTarget && normalizedInput.length > 0) {
                showToast("ممتاز! إملاء صوتي صحيح 100%. +30 نقطة", true);
                if (typeof triggerConfetti === "function") triggerConfetti();
                state.score += 30;
                updateDashboardStats();
                incrementCompletedExercises();
                
                fb.classList.add('border-emerald-500', 'bg-emerald-950/50', 'text-emerald-300');
                fb.innerHTML = `<b>أحسنت! الإجابة المثالية:</b><br><span dir="ltr" class="font-serif block mt-1">${dictationState.english}</span>`;
            } else {
                addPassageMistake(passagesData[dictationState.index]);
                fb.classList.add('border-red-500', 'bg-red-950/50', 'text-red-300');
                fb.innerHTML = `<b>يوجد أخطاء في الإملاء.</b> حاول الاستماع والمراجعة مرة أخرى.<br><span class="text-[10px] mt-2 block opacity-70">النص الأصلي كان: ${dictationState.english}</span>`;
            }
        }

        function exitDictationToSelector() {
            if(window.speechSynthesis) window.speechSynthesis.cancel();
            document.getElementById('dictation-selector-view').classList.remove('hidden');
            document.getElementById('dictation-play-view').classList.add('hidden');
            startDictationGameSelector();
        }

        // --- TAB 4: OFFICIAL INTERACTIVE EXAM SIMULATOR ---
        const officialExamQuestionsList = [
            { id: 1, arabic: "قواعد مجردة", english: "Abstract rules" },
            { id: 2, arabic: "هيئة النيابة الإدارية", english: "Administrative Prosecution Authority" },
            { id: 3, arabic: "مشروع القانون", english: "Bill" },
            { id: 4, arabic: "قواعد مكملة", english: "Supplementary rules" },
            { id: 5, arabic: "العرف", english: "Custom" },
            { id: 6, arabic: "عقوبة إدارية", english: "Administrative penalty" },
            { id: 7, arabic: "سلطة", english: "Authority" },
            { id: 8, arabic: "المواطن", english: "Citizen" },
            { id: 9, arabic: "حالة الطوارئ", english: "State of emergency" },
            { id: 10, arabic: "انتخابات", english: "Elections" }
        ];

        function startOfficialExam() {
            state.examStarted = true;
            state.examTimeRemaining = 7200; // 2 hours
            state.examAnswersQ1 = {};
            document.getElementById('exam-q2-input').value = '';
            document.getElementById('exam-q3-input').value = '';

            document.getElementById('exam-start-gate').classList.add('hidden');
            document.getElementById('exam-live-paper').classList.remove('hidden');
            document.getElementById('exam-result-gate').classList.add('hidden');

            // Render Term translation inputs (Section 1)
            const container = document.getElementById('exam-q1-container');
            container.innerHTML = '';

            officialExamQuestionsList.forEach((q, idx) => {
                const box = document.createElement('div');
                box.className = "bg-slate-950/80 p-3 rounded-xl border border-slate-850 flex justify-between items-center text-xs";
                box.innerHTML = `
                    <span class="font-bold text-slate-100">${idx+1}. ${q.arabic}</span>
                    <input type="text" id="exam-ans-q1-${q.id}" placeholder="English..." class="w-1/2 bg-slate-900 border border-slate-800 text-white rounded-lg px-2.5 py-1.5 focus:border-amber-500 focus:outline-none text-left font-serif text-amber-300">
                `;
                container.appendChild(box);
            });

            // Start Timer
            if (state.examTimerInterval) clearInterval(state.examTimerInterval);
            state.examTimerInterval = setInterval(() => {
                state.examTimeRemaining--;
                if (state.examTimeRemaining <= 0) {
                    clearInterval(state.examTimerInterval);
                    submitOfficialExam();
                } else {
                    const hrs = String(Math.floor(state.examTimeRemaining / 3600)).padStart(2, '0');
                    const mins = String(Math.floor((state.examTimeRemaining % 3600) / 60)).padStart(2, '0');
                    const secs = String(state.examTimeRemaining % 60).padStart(2, '0');
                    document.getElementById('exam-timer-display').innerText = `${hrs}:${mins}:${secs}`;
                }
            }, 1000);
        }

        function submitOfficialExam() {
            clearInterval(state.examTimerInterval);

            // Grade calculations
            let q1Score = 0; // out of 5
            let q2Score = 0; // out of 5
            let q3Score = 0; // out of 5

            // Evaluate Q1 (10 terms, each correct term awards 0.5 marks)
            officialExamQuestionsList.forEach(q => {
                const userInput = document.getElementById(`exam-ans-q1-${q.id}`).value.trim().toLowerCase();
                const modelAns = q.english.toLowerCase();
                if (userInput === modelAns) {
                    q1Score += 0.5;
                }
            });

            // Evaluate Q2 (Translate paragraph from EN to AR)
            const q2Input = document.getElementById('exam-q2-input').value.trim();
            const q2Keywords = ["مجموعة", "القواعد", "العامة", "المجردة", "الملزمة", "سنها", "تطبيقها", "عقوبة", "حالية", "مادية", "السلطة", "العامة", "انتهاك"];
            let q2Matches = 0;
            q2Keywords.forEach(keyword => {
                if (q2Input.includes(keyword)) q2Matches++;
            });
            q2Score = Math.min(5, Math.max(0, (q2Matches / q2Keywords.length) * 5));
            // Round to nearest 0.5
            q2Score = Math.round(q2Score * 2) / 2;

            // Evaluate Q3 (Translate paragraph from AR to EN)
            const q3Input = document.getElementById('exam-q3-input').value.trim().toLowerCase();
            const q3Keywords = ["imperative", "rule", "individuals", "agree", "ruling", "other", "decides", "null", "void", "effect", "excluded", "homicide"];
            let q3Matches = 0;
            q3Keywords.forEach(keyword => {
                if (q3Input.includes(keyword)) q3Matches++;
            });
            q3Score = Math.min(5, Math.max(0, (q3Matches / q3Keywords.length) * 5));
            q3Score = Math.round(q3Score * 2) / 2;

            const totalExamScore = q1Score + q2Score + q3Score;

            // Generate grades and certificate
            document.getElementById('exam-live-paper').classList.add('hidden');
            document.getElementById('exam-result-gate').classList.remove('hidden');

            document.getElementById('exam-final-score').innerText = `${totalExamScore} / 15`;

            let gradeText = "";
            let emoji = "🎓";
            const certificate = document.getElementById('exam-certificate');

            if (totalExamScore >= 13) {
                gradeText = "التقدير: ممتاز مرتفع (مع مرتبة الشرف الأكاديمية)";
                emoji = "🏆🥇👑";
                certificate.classList.remove('hidden');
                document.getElementById('certificate-user-name').innerText = `دكتور / دكتورة [ ${state.userName} ]`;
            } else if (totalExamScore >= 10.5) {
                gradeText = "التقدير: جيد جداً مرتفع";
                emoji = "🎖️🎓";
                certificate.classList.add('hidden');
            } else if (totalExamScore >= 7.5) {
                gradeText = "التقدير: مقبول (تحتاج لبعض المراجعة مع المستشار)";
                emoji = "⏳📚";
                certificate.classList.add('hidden');
            } else {
                gradeText = "التقدير: ضعيف (يرجى مراجعة وضع المذاكرة وإعادة المحاولة)";
                emoji = "⚠️";
                certificate.classList.add('hidden');
            }

            document.getElementById('exam-grade-text').innerText = gradeText;
            document.getElementById('exam-result-emoji').innerText = emoji;

            // Add points to global database
            state.score += Math.round(totalExamScore * 10);
            updateDashboardStats();
            updateOverallProgress();
        }

        function resetOfficialExam() {
            document.getElementById('exam-start-gate').classList.remove('hidden');
            document.getElementById('exam-live-paper').classList.add('hidden');
            document.getElementById('exam-result-gate').classList.add('hidden');
            document.getElementById('exam-certificate').classList.add('hidden');
        }


        // --- TAB 5: SETTINGS & GLOSSARY DATABASE MANIPULATION ---
        function saveSettingsProfile() {
            const name = document.getElementById('settings-username').value.trim();
            const title = document.getElementById('settings-title').value;

            if (!name) {
                showToast("الاسم لا يمكن أن يكون فارغاً.", false);
                return;
            }

            state.userTitle = title;
            state.userName = name;

            // Save to localStorage
            localStorage.setItem('userName', state.userName);
            localStorage.setItem('userTitle', state.userTitle);
            localStorage.setItem('selectedGenderType', title === "دكتور" ? "male" : "female");

            document.getElementById('user-header-welcome').innerText = `${state.userTitle} / ${state.userName}`;
            document.getElementById('dash-greeting').innerText = `أهلاً بك يا ${state.userTitle} ${state.userName}`;
            
            const studyTitleWelcome = document.getElementById('study-title-welcome');
            if (studyTitleWelcome) {
                studyTitleWelcome.innerText = `أهلاً بك ${state.userTitle} في وضع المذاكرة`;
            }

            showToast("تم تحديث الملف الشخصي بنجاح!");
        }

        function changeUserPasscode() {
            const newCode = document.getElementById('settings-passcode').value.trim();
            const oldCode = getUserId();
            
            if (newCode.length < 4) {
                showToast("الرجاء إدخال رقم هاتف صحيح", false);
                return;
            }
            if (newCode === oldCode) {
                showToast("رقم الهاتف الجديد مطابق للرقم الحالي!", false);
                return;
            }

            showToast("جاري نقل البيانات...", true);
            // Sync to new code
            db.collection("users").doc(newCode).set({
                name: state.userName,
                title: state.userTitle,
                score: state.score,
                completedExercises: state.completedExercises || 0,
                failures: state.failures || [],
                failedPassages: state.failedPassages || [],
                customTerms: state.customTerms || [],
                lastActive: firebase.firestore.FieldValue.serverTimestamp(),
                appVersion: APP_VERSION
            }, { merge: true }).then(() => {
                // Delete old code doc to prevent duplicates
                if (oldCode) {
                    db.collection("users").doc(oldCode).delete().catch(console.error);
                }
                
                // Update local storage
                localStorage.setItem('user_device_id', newCode);
                state.userId = newCode;
                showToast("تم تغيير رقم الهاتف ونقل بياناتك بنجاح!", true);
                document.getElementById('settings-passcode').value = '';
            }).catch(e => {
                console.error(e);
                showToast("فشل نقل البيانات. تأكد من اتصالك بالإنترنت.", false);
            });
        }

        function logoutUser() {
            localStorage.clear();
            showToast("تم تسجيل الخروج. جاري إغلاق التطبيق...", true);
            setTimeout(() => location.reload(true), 1000);
        }

        function renderVocabSettingsList() {
            const container = document.getElementById('vocab-settings-list');
            container.innerHTML = '';

            glossaryData.forEach(item => {
                const card = document.createElement('div');
                card.className = "flex justify-between items-center p-3 bg-slate-950 border border-slate-850 rounded-2xl text-[11px]";
                card.innerHTML = `
                    <div class="text-right">
                        <span class="font-bold text-slate-100 block">${item.arabic}</span>
                        <span class="english-text text-amber-500 font-bold block">${item.english}</span>
                        <span class="text-[9px] text-slate-500">ص: ${item.page} | ${item.category}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <button onclick="toggleIgnoreTerm(${item.id}); renderVocabSettingsList();" class="px-2 py-1.5 rounded-lg text-[9px] font-bold ${item.ignored ? 'bg-amber-500 text-slate-950' : 'bg-slate-850 text-slate-300'}">
                            ${item.ignored ? '🚫 متجاهل' : '🔔 نشط'}
                        </button>
                        <button onclick="deleteTermFromDB(${item.id})" class="bg-red-950 text-red-300 px-2 py-1.5 rounded-lg font-bold">حذف</button>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        function deleteTermFromDB(id) {
            glossaryData = glossaryData.filter(t => t.id !== id);
            showToast("تم حذف المصطلح القانوني من مسرد المنصة.");
            renderVocabSettingsList();
            initStudyMode();
            updateOverallProgress();
        }

        function addNewCustomTerm() {
            const ar = document.getElementById('add-term-ar').value.trim();
            const en = document.getElementById('add-term-en').value.trim();
            const cat = document.getElementById('add-term-cat').value.trim() || "تصنيف مخصص";
            const page = document.getElementById('add-term-page').value.trim() || "-";

            if (!ar || !en) {
                showToast("الرجاء إدخال الحقول الإلزامية بالعربية والإنجليزية.", false);
                return;
            }

            const newId = glossaryData.length > 0 ? Math.max(...glossaryData.map(t => t.id)) + 1 : 1;
            const newTerm = {
                id: newId,
                arabic: ar,
                english: en,
                type: "word",
                page: page,
                category: cat,
                ignored: false,
                isCustom: true
            };
            glossaryData.unshift(newTerm);
            state.customTerms.push(newTerm);
            
            // Save locally
            localStorage.setItem('userCustomTerms', JSON.stringify(state.customTerms));
            // Sync to cloud immediately
            if (typeof updateCloudArray === 'function') updateCloudArray('customTerms', newTerm, true);

            // reset inputs
            document.getElementById('add-term-ar').value = '';
            document.getElementById('add-term-en').value = '';
            document.getElementById('add-term-cat').value = '';
            document.getElementById('add-term-page').value = '';

            showToast(`تم إدراج المصطلح [ ${ar} ] بنجاح!`);
            renderVocabSettingsList();
            initStudyMode();
            updateOverallProgress();
        }

        function exportCustomTerms() {
            if (!state.customTerms || state.customTerms.length === 0) {
                showToast("لا توجد كلمات مضافة لتصديرها.", false);
                return;
            }
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.customTerms));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "custom_legal_terms.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        }

        function importCustomTerms(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result);
                    if (Array.isArray(imported)) {
                        let addedCount = 0;
                        imported.forEach(term => {
                            if (!state.customTerms.some(c => c.arabic === term.arabic && c.english === term.english)) {
                                state.customTerms.push(term);
                                if (!glossaryData.some(g => g.arabic === term.arabic && g.english === term.english)) {
                                    glossaryData.unshift(term);
                                }
                                addedCount++;
                            }
                        });
                        if (addedCount > 0) {
                            localStorage.setItem('userCustomTerms', JSON.stringify(state.customTerms));
                            if (typeof updateCloudField === 'function') updateCloudField('customTerms', state.customTerms);
                            showToast(`تم استيراد ${addedCount} كلمة بنجاح!`, true);
                            renderVocabSettingsList();
                            initStudyMode();
                            updateOverallProgress();
                        } else {
                            showToast("الكلمات المستوردة موجودة مسبقاً.", false);
                        }
                    } else {
                        showToast("ملف غير صالح.", false);
                    }
                } catch(err) {
                    showToast("خطأ في قراءة الملف.", false);
                }
            };
            reader.readAsText(file);
            event.target.value = ''; // reset
        }

        // --- SUB NAV FOR DETAILS MAPPING ---
        function switchBookTab(id) {
            const subtabs = document.querySelectorAll('.book-subtab-content');
            subtabs.forEach(tab => {
                tab.classList.add('hidden');
                tab.classList.remove('block');
            });

            const target = document.getElementById(id);
            if (target) {
                target.classList.remove('hidden');
                target.classList.add('block');
            }

            const buttons = document.querySelectorAll('.book-subtab-btn');
            buttons.forEach(b => {
                b.className = "book-subtab-btn bg-slate-950 text-slate-400 py-1.5 px-2 rounded-xl text-[10px] font-bold transition";
            });

            const activeBtn = Array.from(buttons).find(b => b.getAttribute('onclick').includes(id));
            if (activeBtn) {
                activeBtn.className = "book-subtab-btn bg-slate-800 text-amber-400 border border-amber-500/20 py-1.5 px-2 rounded-xl text-[10px] font-bold transition";
            }

            if (id === 'book-glossary') {
                setupGlossaryBookGrid();
            }
        }

        function setupGlossaryBookGrid() {
            const grid = document.getElementById('book-glossary-grid');
            grid.innerHTML = '';
            glossaryData.forEach(item => {
                const box = document.createElement('div');
                box.className = "p-3 bg-slate-900 border border-slate-800 rounded-2xl flex justify-between items-center text-xs";
                box.innerHTML = `
                    <span class="font-bold text-slate-200 text-right">${item.arabic}</span>
                    <span class="english-text text-amber-400 font-bold text-left">${item.english}</span>
                `;
                grid.appendChild(box);
            });
        }
    

