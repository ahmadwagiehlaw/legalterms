import re

def rewrite():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # 2. updateDashboardStats
        content = re.sub(
            r'function updateDashboardStats\(\) \{[\s\S]*?\}',
            """function updateDashboardStats() {
            document.getElementById('score-val').innerText = state.score;
            localStorage.setItem('userScore', state.score);
            if (typeof updateCloudField === 'function') updateCloudField('score', state.score);
        }""", content)

        # 4. addMistake
        content = re.sub(
            r'function addMistake\(term\) \{[\s\S]*?\}',
            """function addMistake(term) {
            if (!state.failures.some(item => item.id === term.id)) {
                state.failures.push(term);
                localStorage.setItem('userFailures', JSON.stringify(state.failures));
                renderMistakesWidget();
                if (typeof updateCloudArray === 'function') updateCloudArray('failures', term, true);
            }
        }""", content)

        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Done")
    except Exception as e:
        print(f"Error: {e}")

rewrite()
