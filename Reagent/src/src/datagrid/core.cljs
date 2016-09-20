(ns datagrid.core
    (:require [reagent.core :as r]))

(defn remove-at-idx [idx data]
  (let [[head tail] (split-at idx data)]
    (into (vec head) (rest tail))))

(defn row [data idx {:keys [ResourceDescription ResourceAddress]}]
  [:tr
   [:td ResourceDescription]
   [:td ResourceAddress]
   [:td [:a.btn
         {:on-click #(swap! data (partial remove-at-idx idx))}
         "Remove"]]])

(defn text-input [data]
  [:input
   {:type :text
    :on-change #(reset! data (-> % .-target .-value))
    :value @data}])

(defn add-row [table-data]
  (r/with-let [row-data (r/atom {})]
    [:div
     [:label "Description:"]
     [text-input (r/cursor row-data [:ResourceDescription])]
     [:label "URL:"]
     [text-input (r/cursor row-data [:ResourceAddress])]
     [:a.btn
      {:on-click #(swap! table-data conj @row-data)}
      "Add"]]))

(defn table [data]
  [:table
   [:thead>tr
    [:th "Description"]
    [:th "URL"]]
   [:tbody
    (for [[idx item] (map-indexed vector @data)]
      ^{:key idx}
      [row data idx item])]])

(defn show [table-data]
  [:div
     [:a.btn
      {:on-click #(js/alert (str @table-data))}
      "show"]])
;; -------------------------
;; Views
(def table-data (r/atom [{:ResourceDescription "Great site"
                          :ResourceAddress "http://www.discoversdk.com"}]))

(defn home-page []
  [:div
   [:h3 "Add Resources"]
   [add-row table-data]
   [:h3 "List of Resources"]
   [table table-data]
   [show table-data]])

;; -------------------------
;; Initialize app

(defn mount-root []
  (r/render [home-page] (.getElementById js/document "app")))

(defn init! []
  (mount-root))
