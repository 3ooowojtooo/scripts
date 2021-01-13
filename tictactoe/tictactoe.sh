#!/bin/bash

plansza=("0" "0" "0" "0" "0" "0" "0" "0" "0")
gracz="1"
wygrana=false

function wyswietlPlansze {
 echo "${plansza[0]} | ${plansza[1]} | ${plansza[2]}"
 echo "${plansza[3]} | ${plansza[4]} | ${plansza[5]}"
 echo "${plansza[6]} | ${plansza[7]} | ${plansza[8]}"
}

function zmienGracza {
 if [ $gracz -eq "1" ]; then
  gracz="2"
 else
  gracz="1"
 fi
}

function ruch {
  while true
  do
    clear
    wyswietlPlansze
    echo "Ruch gracza $gracz: "
    read wybor
    echo "Wybrano $wybor"
    # TODO jest cos nie tak w przypisywaniu gracza do pola w planszy
    if [ "$wybor" -ge "0" ] && [ $wybor -le "8" ] && [ "${plansza[$wybor]}" -eq "0" ]; then
      plansza[$wybor]=$gracz # tutaj
      break
    fi
  done
  clear
  wyswietlPlansze
}

function sprawdzWygrana {
  for i in {0..2}
  do
    # wiersze
    if [ ${plansza[i * 3]} -eq $gracz ] && [ ${plansza[i * 3 + 1]} -eq $gracz ] && [ ${plansza[i * 3 +2]} -eq $gracz ]; then
      wygrana=true
      break
    fi
    #kolumny
    if [ ${plansza[i]} -eq $gracz ] && [ ${plansza[i + 3]} -eq $gracz ] && [ ${plansza[i + 6]} -eq $gracz ]; then
      wygrana=true
      break
    fi
  done
  # skosy
  if [ ${plansza[0]} -eq $gracz ] && [ ${plansza[4]} -eq $gracz ] && [ ${plansza[8]} -eq $gracz ]; then
    wygrana=true
    break
  fi
  if [ ${plansza[2]} -eq $gracz ] && [ ${plansza[4]} -eq $gracz ] && [ ${plansza[6]} -eq $gracz ]; then
    wygrana=true
    break
  fi
}

while true
do
  ruch
  sprawdzWygrana
  if [ "$wygrana" = true ]; then
    echo "Wygrywa gracz $gracz"
    break
  fi
  zmienGracza
done
