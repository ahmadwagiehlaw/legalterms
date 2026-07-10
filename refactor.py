import re

try:
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace syncToCloud definition with updateCloudField and updateCloudArray
    sync_def_pattern = re.compile(r'function syncToCloud\(\) \{.*?\n        \}', re.DOTALL)
    new_sync_defs = """function updateCloudField(field, value) {
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
        }"""
    content = sync_def_pattern.sub(new_sync_defs, content, count=1)

    # 2. updateDashboardStats
    content = content.replace("if (typeof syncToCloud === 'function') syncToCloud();", "if (typeof updateCloudField === 'function') updateCloudField('score', state.score);", 1)

    # 3. incrementCompletedExercises (wait, it might not have the if typeof check)
    content = content.replace("""        function incrementCompletedExercises() {
            state.completedExercises = (state.completedExercises || 0) + 1;
            localStorage.setItem('userCompletedExercises', state.completedExercises);
            syncToCloud();
        }""", """        function incrementCompletedExercises() {
            state.completedExercises = (state.completedExercises || 0) + 1;
            localStorage.setItem('userCompletedExercises', state.completedExercises);
            if (typeof updateCloudField === 'function') updateCloudField('completedExercises', state.completedExercises);
        }""")

    # 4. addMistake
    content = content.replace("""        function addMistake(term) {
            if (!state.failures.some(item => item.id === term.id)) {
                state.failures.push(term);
                localStorage.setItem('userFailures', JSON.stringify(state.failures));
                renderMistakesWidget();
                if (typeof syncToCloud === 'function') syncToCloud();
            }
        }""", """        function addMistake(term) {
            if (!state.failures.some(item => item.id === term.id)) {
                state.failures.push(term);
                localStorage.setItem('userFailures', JSON.stringify(state.failures));
                renderMistakesWidget();
                if (typeof updateCloudArray === 'function') updateCloudArray('failures', term, true);
            }
        }""")

    # 5. removeMistake
    content = content.replace("""        function removeMistake(id) {
            state.failures = state.failures.filter(t => t.id !== id);
            localStorage.setItem('userFailures', JSON.stringify(state.failures));
            renderMistakesWidget();
            if (typeof syncToCloud === 'function') syncToCloud();
        }""", """        function removeMistake(id) {
            const term = state.failures.find(t => t.id === id);
            if (!term) return;
            state.failures = state.failures.filter(t => t.id !== id);
            localStorage.setItem('userFailures', JSON.stringify(state.failures));
            renderMistakesWidget();
            if (typeof updateCloudArray === 'function') updateCloudArray('failures', term, false);
        }""")

    # 6. addPassageMistake
    # We just replace the `if (typeof syncToCloud === 'function') syncToCloud();` inside addPassageMistake
    # Note: there is only one in that block, but we can replace it safely
    content = content.replace("""                    localStorage.setItem('userCustomTerms', JSON.stringify(state.customTerms));
                    
                    if (typeof syncToCloud === 'function') syncToCloud();""", """                    localStorage.setItem('userCustomTerms', JSON.stringify(state.customTerms));
                    
                    if (typeof updateCloudArray === 'function') updateCloudArray('customTerms', newTerm, true);""")

    # 7. removePassageMistake
    content = content.replace("""        function removePassageMistake(title) {
            state.failedPassages = state.failedPassages.filter(t => t.title !== title);
            localStorage.setItem('userFailedPassages', JSON.stringify(state.failedPassages));
            renderPassageMistakesWidget();
            if (typeof syncToCloud === 'function') syncToCloud();
        }""", """        function removePassageMistake(title) {
            const def = state.failedPassages.find(t => t.title === title);
            if (!def) return;
            state.failedPassages = state.failedPassages.filter(t => t.title !== title);
            localStorage.setItem('userFailedPassages', JSON.stringify(state.failedPassages));
            renderPassageMistakesWidget();
            if (typeof updateCloudArray === 'function') updateCloudArray('failedPassages', def, false);
        }""")

    # 8. deleteTermFromDB
    content = content.replace("""        function deleteTermFromDB(id) {
            glossaryData = glossaryData.filter(t => t.id !== id);
            state.customTerms = state.customTerms.filter(t => t.id !== id);
            localStorage.setItem('userCustomTerms', JSON.stringify(state.customTerms));
            if (typeof syncToCloud === 'function') syncToCloud();
            showToast("تم حذف المصطلح من المسرد بنجاح.");""", """        function deleteTermFromDB(id) {
            const term = state.customTerms.find(t => t.id === id);
            if (term && typeof updateCloudArray === 'function') updateCloudArray('customTerms', term, false);
            
            glossaryData = glossaryData.filter(t => t.id !== id);
            state.customTerms = state.customTerms.filter(t => t.id !== id);
            localStorage.setItem('userCustomTerms', JSON.stringify(state.customTerms));
            showToast("تم حذف المصطلح من المسرد بنجاح.");""")

    # 9. addNewCustomTerm
    content = content.replace("""                            localStorage.setItem('userCustomTerms', JSON.stringify(state.customTerms));
                            
                            if (typeof syncToCloud === 'function') syncToCloud();""", """                            localStorage.setItem('userCustomTerms', JSON.stringify(state.customTerms));
                            
                            if (typeof updateCloudArray === 'function') updateCloudArray('customTerms', newTerm, true);""")

    # 10. saveSettingsProfile
    content = content.replace("""            if (typeof syncToCloud === 'function') syncToCloud();

            showToast("تم حفظ بياناتك بنجاح!");""", """            if (typeof updateCloudField === 'function') {
                updateCloudField('name', state.userName);
                updateCloudField('title', state.userTitle);
            }

            showToast("تم حفظ بياناتك بنجاح!");""")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Replacements done.")
except Exception as e:
    print(f"Error: {e}")
