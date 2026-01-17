import os
import subprocess
import time
import json

def test_single_image(python_cmd, script_path, image_path):
    print(f"Testing {os.path.basename(image_path)}...")
    start_time = time.time()
    try:
        result = subprocess.run(
            [python_cmd, script_path, image_path],
            capture_output=True,
            text=True,
            timeout=300 # 5 minutes timeout per image for testing
        )
        end_time = time.time()
        duration = end_time - start_time
        
        if result.returncode == 0:
            try:
                data = json.loads(result.stdout)
                text_len = len(data.get("text", ""))
                print(f"  Success! Duration: {duration:.2f}s | Text Length: {text_len}")
                # Print first 100 chars of text for verification
                preview = data.get("text", "").replace("\n", " ")[:100]
                print(f"  Preview: {preview}...")
            except json.JSONDecodeError:
                print(f"  Failed to parse JSON. Output: {result.stdout[:200]}")
        else:
            print(f"  Error! Return Code: {result.returncode}")
            print(f"  Stderr: {result.stderr}")
            
    except subprocess.TimeoutExpired:
        print(f"  Timed out after 300s!")
    except Exception as e:
        print(f"  Unexpected error: {str(e)}")
    print("-" * 30)

def main():
    python_cmd = "python3.13"
    script_path = os.path.join("scripts", "ocr.py")
    test_dir = os.path.join("test_ids")
    
    # Specific images requested by user
    images = ["IMG_2488.jpg", "IMG_2496.jpg", "IMG_2497.png"]
    
    if not os.path.exists(test_dir):
        print(f"Error: {test_dir} not found")
        return

    for img_name in images:
        path = os.path.join(test_dir, img_name)
        if os.path.exists(path):
            test_single_image(python_cmd, script_path, path)
        else:
            print(f"File {img_name} not found in {test_dir}")

if __name__ == "__main__":
    main()
