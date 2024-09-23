import pandas as pd

# Stipend Updates
# 20-21 Sem 1 Done
# 20-21 Sem 2
# 21-22 Sem 1
# 21-22 Sem 2
# 22-23 Sem 1 Done
# 22-23 Sem 2 Done
# 23-24 Sem 1 Done
# 23-24 Sem 2 
# 24-25 Sem 1 Partial Done

data = pd.read_csv('./24-25 1.csv', encoding='utf-8', encoding_errors='replace')

stipend_mapping = {}

COMPANY_KEY = 'Station Name'
STIPEND_KEY = 'Stipend'

for idx, row in data.iterrows():
    if row[STIPEND_KEY] == '-':
        continue
    try:
        stipend_mapping[row[COMPANY_KEY].replace(" ", "%")] = int(row[STIPEND_KEY])
        stipend_mapping[row[COMPANY_KEY].split("-")[0]] = int(row[STIPEND_KEY])
        stipend_mapping[row[COMPANY_KEY]] = int(row[STIPEND_KEY])
    except:
        print(row)

sql_output = ""
for key in stipend_mapping:
    sql_output += (f"UPDATE ps2_responses SET stipend = {stipend_mapping[key]} WHERE station LIKE '{key}%' AND year_and_sem = '24-25 Sem 1';")

with open('stipend.sql', 'w') as f:
    f.write(sql_output)