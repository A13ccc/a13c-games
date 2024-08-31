import os

def rename_index_files():
    # Get the current working directory
    root_dir = os.getcwd()

    # Walk through all folders and subfolders
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Check if 'index.html' exists in the current directory
        if 'index.html' in filenames:
            parent_folder_name = os.path.basename(dirpath)
            new_file_name = f"{parent_folder_name}.html"
            old_file_path = os.path.join(dirpath, 'index.html')
            new_file_path = os.path.join(dirpath, new_file_name)

            # Rename the index.html to parent_folder_name.html
            os.rename(old_file_path, new_file_path)
            print(f"Renamed '{old_file_path}' to '{new_file_path}'")

if __name__ == "__main__":
    rename_index_files()
