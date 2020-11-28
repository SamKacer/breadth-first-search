import json

rows = []

with open('perMillion.csv') as f:
    for line in f:
        rows.append(line[:-1].split(","))

def group_by(selector, xs):
    result = {}
    for x in xs:
        key = selector(x)
        if key in result:
            result[key].append(x)
        else:
            result[key] = [x]
    return result

def transpose(l1):
    return [[row[i] for row in l1] for i in range(len(l1[0]))] 

grouped = group_by(lambda row: row[0], rows[1:])
del grouped[""]
countries_to_new_cases_per_mil = { 
    country : [list(map(float, d)) for d in transpose(data)[1:]]
    for (country, data) in grouped.items()
}

print(json.dumps(countries_to_new_cases_per_mil, indent=2))