import sys

try:
    with open('index.html', 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Strip BOM if present
    if text.startswith('\ufeff'):
        text = text[1:]
        
    # Try cp1256
    try:
        original_bytes = text.encode('cp1256')
        restored_text = original_bytes.decode('utf-8')
        with open('index.html.restored', 'w', encoding='utf-8') as f:
            f.write(restored_text)
        print("Success with cp1256")
    except Exception as e1:
        print(f"cp1256 failed: {e1}")
        
        # Try cp1252
        original_bytes = text.encode('cp1252')
        restored_text = original_bytes.decode('utf-8')
        with open('index.html.restored', 'w', encoding='utf-8') as f:
            f.write(restored_text)
        print("Success with cp1252")

except Exception as e:
    print(f"Error: {e}")
