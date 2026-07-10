import re

try:
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. replace syncToCloud in saveInitialProfile (line ~1120) with a db set call.
    content = re.sub(
        r'showToast\("تم إنشاء الحساب بنجاح! جاري التهيئة\.\.\.", true\);\s*syncToCloud\(\);',
        """showToast("تم إنشاء الحساب بنجاح! جاري التهيئة...", true);
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
            }, { merge: true });""", content)

    # 2. replace syncToCloud in addNewCustomTerm (line ~3444)
    content = re.sub(
        r'// Sync to cloud immediately\s*if \(typeof syncToCloud === \'function\'\) syncToCloud\(\);',
        """// Sync to cloud immediately
            if (typeof updateCloudArray === 'function') updateCloudArray('customTerms', newTerm, true);""", content)

    # 3. replace syncToCloud in bulk import (line ~3492)
    # This imports multiple, so updateCloudField('customTerms', state.customTerms) is appropriate
    content = re.sub(
        r'localStorage\.setItem\(\'userCustomTerms\', JSON\.stringify\(state\.customTerms\)\);\s*if \(typeof syncToCloud === \'function\'\) syncToCloud\(\);',
        """localStorage.setItem('userCustomTerms', JSON.stringify(state.customTerms));
                            if (typeof updateCloudField === 'function') updateCloudField('customTerms', state.customTerms);""", content)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

    print("Final Replacements done.")
except Exception as e:
    print(f"Error: {e}")
