
import sys
import os

dir = sys.argv[1]
total = 0

for subdir, dirs, files in os.walk(dir):
    for file in files:
        if file.endswith(".js"):
            path = os.path.join(subdir, file)
            if "node_modules" not in path:
                with open(path, "r+", encoding="utf8") as file:
                    text = file.read()
                    count = text.count(";\n")
                    text = text.replace(";\n", "\n")
                    open(path, "w").close()
                    file.seek(0)
                    file.write(text)
                    file.close()
                print(f"{count};\t{path}")
                total += count

print("=" * 80)
print(f"Total ; in {dir}: {total}")
print("=" * 80)
