import pandas as pd
import numpy as np
import sys
zipcode = sys.argv[1]
mapped_data = [zipcode_mapping[str(zipcode)]]
freqs = [
    mapped_data["unit_0_freq"],
    mapped_data["unit_1_freq"],
    mapped_data["unit_2_freq"],
    mapped_data["unit_3_freq"],
    mapped_data["unit_4_freq"],
    mapped_data["unit_5_freq"],
    mapped_data["unit_6_freq"],
    mapped_data["unit_7_freq"],
    mapped_data["unit_8_freq"]
]
idx = 0
max_val = freqs[0]
for i,f in enumerate(freqs):
    if f > max_val:
        max_val = f
        idx = i
unit_type_mapping = [
    'CHIEF',
    'ENGINE',
    'INVESTIGATION',
    'MEDIC',
    'PRIVATE',
    'RESCUE CAPTAIN',
    'RESCUE SQUAD',
    'SUPPORT',
    'TRUCK'
]
print(unit_type_mapping[idx])
sys.stdout.flush()
